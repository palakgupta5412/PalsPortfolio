import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fetch both API keys from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

# Initialize Primary LLM (Groq) with a stable active model
groq_llm = None
if GROQ_API_KEY:
    try:
        groq_llm = ChatGroq(
            model="openai/gpt-oss-120b",  # Stable Groq model
            temperature=0.4,
            groq_api_key=GROQ_API_KEY
        )
    except Exception as e:
        print(f"Failed to initialize Groq: {e}")

# Initialize Fallback LLM (Gemini)
gemini_llm = None
if GOOGLE_API_KEY:
    try:
        gemini_llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0.4,
            google_api_key=GOOGLE_API_KEY
        )
    except Exception as e:
        print(f"Failed to initialize Gemini: {e}")

# Load full chatbot knowledge JSON directly into memory
KNOWLEDGE_PATH = os.path.join(os.path.dirname(__file__), "data", "botKnowledge.json")

def load_knowledge_base():
    if os.path.exists(KNOWLEDGE_PATH):
        with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

knowledge_data = load_knowledge_base()
knowledge_string = json.dumps(knowledge_data, indent=2)

# Define Chat Request Schema
class ChatMessage(BaseModel):
    message: str
    history: Optional[List[dict]] = []

@app.post("/api/chat")
async def chat_endpoint(payload: ChatMessage):
    try:
        user_message = payload.message
        chat_history = payload.history or []

        # Convert frontend history to LangChain messages format
        formatted_history = []
        for msg in chat_history:
            if msg.get("role") == "user":
                formatted_history.append(HumanMessage(content=msg.get("content")))
            elif msg.get("role") == "assistant":
                formatted_history.append(AIMessage(content=msg.get("content")))

        # Professional Interview Persona Prompt (No robotic knowledge-base mentions)
    # Professional Interview Persona Prompt (No robotic knowledge-base mentions)
        system_content = f"""You are Palak Gupta, an IT undergraduate student at Maharaja Surajmal Institute of Technology (MSIT) in New Delhi, graduating in 2027, and working as an AI & Software Engineering Intern. 
        You are speaking in a professional technical interview or portfolio interaction.

        STRICT CONSTRAINTS (YOU MUST FOLLOW THESE 100%):
        1. Speak strictly in the first person ("I", "my") as Palak. Never break character.
        2. NEVER mention phrases like "according to my knowledge base", "the JSON file", "data provided", or act like an AI model. Speak like a real human candidate.
        3. NEVER ask counter-questions back to the user (e.g., do NOT say "How about you?", "What projects are you working on?", or "Any projects you're excited about?"). Just give a direct, professional answer.
        4. USE ONLY THE KNOWLEDGE BASE PROVIDED BELOW. Your projects are ONLY: Planify, Better With Books, Intervu.ai, CTRL, Leeto AI, Repodoc AI, and GO-MED Agentic AI Pipeline. Do not invent fake projects, fake internships, or Agile methodologies that are not in this data.
        5. If someone asks about a technology not in your profile (like AWS), state professionally that you haven't worked hands-on with it yet, but focus on your actual stack (React, Node, FastAPI, LangChain, Python, etc.).
        6. Give to the point answer, do not irrelevantly extend ! 

        --- PALAK'S OFFICIAL JSON DATA ---
        {knowledge_string}
        ----------------------------------"""

        messages = [SystemMessage(content=system_content)]
        messages.extend(formatted_history)
        messages.append(HumanMessage(content=user_message))

        response_content = None
        used_model = None

        # 1. Try Primary LLM (Groq) first
        if groq_llm:
            try:
                result = groq_llm.invoke(messages)
                response_content = result.content
                used_model = "Groq"
            except Exception as groq_error:
                print(f"Groq failed/rate-limited: {groq_error}. Switching to Gemini fallback...")

        # 2. Fallback to Gemini if Groq failed or wasn't available
        if not response_content and gemini_llm:
            try:
                result = gemini_llm.invoke(messages)
                response_content = result.content
                used_model = "Gemini (Fallback)"
            except Exception as gemini_error:
                print(f"Gemini fallback also failed: {gemini_error}")
                raise HTTPException(status_code=500, detail="All AI providers are currently unavailable.")

        if not response_content:
            raise HTTPException(status_code=500, detail="No AI model could process the request. Check API keys.")

        return {
            "response": response_content,
            "provider": used_model
        }

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"status": "Portfolio Backend is running with Interview Persona & Fallback!"}