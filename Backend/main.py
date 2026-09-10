import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

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
    with open("data/botKnowledge.json", "r") as f:
        data = json.load(f)
    
    texts = [
        f"Personal Info: {data['personal_info']}",
        f"Experience: {data['experience']}",
        f"Academics: {data['academics']}",
        f"Skills: {data['skills']}",
    ]
    for p in data["projects"]:
        texts.append(f"Project Name: {p['name']}, Tech: {p['tech']}, Description: {p['description']}")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = text_splitter.create_documents(texts)
    
    vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=VECTOR_DB_DIR)
    return vectorstore

vectorstore = init_vector_store()
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3, google_api_key=API_KEY)

# Modern LCEL Prompt Setup
template = """You are Palak Gupta's digital AI clone. Answer questions strictly based 
on the provided context about her education at MSIT, internship at GoMed (Orbit Pro), 
projects, and technical stack.

Context:
{context}

Question: {question}

Answer:"""

prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# LCEL RAG Chain (Clean & Error-Free)
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

class QueryRequest(BaseModel):
    query: str

@app.post("/api/chat")
def chat_endpoint(req: QueryRequest):
    try:
        response = rag_chain.invoke(req.query)
        return {"reply": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))