import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY") # Used for ChromaDB embeddings
GROQ_API_KEY = os.getenv("GROQ_API_KEY") # Used for Chat LLM inference

app = FastAPI(title="Palak's RAG Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VECTOR_DB_DIR = "./chroma_db"
embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview", google_api_key=API_KEY)

def init_vector_store():
    with open("data/botKnowledge.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    texts = [
        f"Personal Info: {data['personal_info']}",
        f"Experience: {data['experience']}",
        f"Academics: {data['academics']}",
        f"Skills: {data['skills']}",
    ]
    
    for p in data["projects"]:
        live = p.get('live_link', '')
        git = p.get('github_link', '')
        
        # Handle description whether it's a string or a list of bullet points
        desc = p['description']
        if isinstance(desc, list):
            desc_text = "\n".join(f"- {item}" for item in desc)
        else:
            desc_text = desc

        texts.append(
            f"Project Name: {p['name']}\n"
            f"Description:\n{desc_text}\n"
            f"Tech Stack: {', '.join(p['technical_skills'])}\n"
            f"Live Link: {live if live else 'Not deployed'}\n"
            f"GitHub Link: {git if git else 'Not public'}"
        )

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=50)
    docs = text_splitter.create_documents(texts)
    
    vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=VECTOR_DB_DIR)
    return vectorstore

vectorstore = init_vector_store()
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# Using Groq with openai/gpt-oss-120b model
llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0.1,
    groq_api_key=GROQ_API_KEY
)

class QueryRequest(BaseModel):
    query: str

@app.post("/api/chat")
def chat_endpoint(req: QueryRequest):
    try:
        user_query = req.query.strip()
        
        # 1. Load knowledge data dynamically inside the endpoint
        with open("data/botKnowledge.json", "r", encoding="utf-8") as f:
            data = json.load(f)

        # 2. Retrieve relevant docs from ChromaDB vector store
        docs = retriever.invoke(user_query)
        context_text = "\n\n".join(doc.page_content for doc in docs)
        
        # 3. Interview-Ready Prompt with Strict Grounding & Growth-Oriented Persona
        prompt_content = f"""You are Palak Gupta, an IT undergraduate student at Maharaja Surajmal Institute of Technology (MSIT) in New Delhi and an AI & Software Engineering Intern, being interviewed by a technical interviewer. Always reply in the first person ("I", "my") as Palak.

EXACT KNOWLEDGE BASE (Use ONLY this information for your background, skills, and projects):
- Personal & Academics: {data['personal_info']} {data['academics']}
- Experience: {data['experience']}
- Skills: {data['skills']}
- Projects: {json.dumps(data['projects'], indent=2)}

CRITICAL INTERVIEW GUIDELINES:
1. Strict Grounding on Facts: Never make up or hallucinate projects, companies, experience, or technologies that are not explicitly listed in the knowledge base above (e.g., if AWS or any unlisted tool is asked about, do not claim you have worked on it).
2. Interview Persona for Unlisted Technologies: If the interviewer asks about a technology or skill not present in your profile, do not give a blunt "no" or say you are focused elsewhere. Instead, answer professionally in character: "I haven't had the chance to work with that particular technology in my current projects yet, but I am a fast learner with a strong foundational grasp of software and AI engineering. If a project or team requires it, I can quickly pick it up and adapt."
3. Formatting: Do not use markdown asterisks (`**`). Keep paragraphs and responses structured with clean line breaks (`\\n`) and bullet points where appropriate. Mention accurate project descriptions and links directly from the knowledge base when asked about projects.

Context / Retrieved Snippets:
{context_text}

Interviewer Question: {user_query}

Answer:"""

        response = llm.invoke([HumanMessage(content=prompt_content)])
        return {"reply": response.content}
        
    except Exception as e:
        print("Chat Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))