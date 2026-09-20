import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
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

# Initialize Primary LLM (Groq)
groq_llm = None
if GROQ_API_KEY:
    try:
        groq_llm = ChatGroq(
            model="llama-3.1-8b-instant",
            temperature=0.3,
            groq_api_key=GROQ_API_KEY
        )
    except Exception as e:
        print(f"Failed to initialize Groq: {e}")

# Initialize Fallback LLM (Gemini)
gemini_llm = None
if GOOGLE_API_KEY:
    try:
        gemini_llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",  # Fast and reliable Gemini model
            temperature=0.3,
            google_api_key=GOOGLE_API_KEY
        )
    except Exception as e:
        print(f"Failed to initialize Gemini: {e}")

# Load full chatbot knowledge JSON directly into memory
KNOWLEDGE_PATH = os.path.join(os.path.dirname(__file__), "data", "chatbot_knowledge.json")

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

        # System Prompt injecting the WHOLE JSON knowledge base directly
        system_prompt = f"""
You are Palak Gupta's AI portfolio clone. Your job is to answer questions about Palak professionally, friendly, and accurately based ONLY on the provided JSON knowledge base below. 
Do not hallucinate or make up facts. If information is not inside the JSON, politely state that you don't have that specific detail.

--- FULL KNOWLEDGE BASE JSON ---
{knowledge_string}
--------------------------------
"""

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="history"),
            ("human", "{input}")
        ])

        input_data = {
            "history": formatted_history,
            "input": user_message
        }

        response_content = None
        used_model = None

        # 1. Try Primary LLM (Groq) first
        if groq_llm:
            try:
                chain = prompt | groq_llm
                result = chain.invoke(input_data)
                response_content = result.content
                used_model = "Groq"
            except Exception as groq_error:
                print(f"Groq failed/rate-limited: {groq_error}. Switching to Gemini fallback...")

        # 2. Fallback to Gemini if Groq failed or wasn't available
        if not response_content and gemini_llm:
            try:
                chain = prompt | gemini_llm
                result = chain.invoke(input_data)
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
    return {"status": "Robust Portfolio Backend is running with Groq -> Gemini fallback!"}