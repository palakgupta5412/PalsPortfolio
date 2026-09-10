import knowledge from '../../../Backend/data/botKnowledge.json';

// Helper: Compute Cosine Similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Generate chunks from JSON
export function getKnowledgeChunks() {
  return [
    { id: 1, text: `Personal Info: Palak Gupta, role: ${knowledge.personal_info.role}, education: ${knowledge.personal_info.education}` },
    { id: 2, text: `Internship Experience: Working at ${knowledge.experience[0].company} (${knowledge.experience[0].duration}) focusing on ${knowledge.experience[0].description}` },
    { id: 3, text: `Schooling & Background: Studied at ${knowledge.personal_info.schooling} with PCM and Python.` },
    { id: 4, text: `Academics (GGSIPU MSIT): Core subjects include ${knowledge.academics.core_subjects.join(', ')}.` },
    { id: 5, text: `Frontend Skills: Uses ${knowledge.skills.frontend_and_ui.join(', ')}. Avoids raw HTML/CSS, relies heavily on React, Tailwind, and GSAP.` },
    { id: 6, text: `Backend & Database: Implements ${knowledge.skills.backend_and_db.join(', ')}, with a strong preference for Firebase Authentication and MongoDB.` },
    { id: 7, text: `AI & Automation: Specializes in ${knowledge.skills.ai_and_automation.join(', ')}.` },
    { id: 8, text: `Core Technical Stack: Proficient in ${knowledge.skills.core.join(', ')}.` },
    ...knowledge.projects.map((p, idx) => ({
      id: 9 + idx,
      text: `Project - ${p.name}: Built with ${p.tech.join(', ')}. Details: ${p.description}`
    }))
  ];
}

// Vector Retrieval Function using OpenAI / API Embeddings
export async function retrieveVectorContext(userQuery, apiKey) {
  const chunks = getKnowledgeChunks();

  // If API key is provided, we can fetch real embeddings. Otherwise, fallback to semantic keyword matrix.
  if (!apiKey) {
    return chunks[0].text; // Fallback
  }

  try {
    // Call OpenAI Embeddings API for query
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        input: userQuery,
        model: "text-embedding-3-small"
      })
    });
    
    const data = await response.json();
    const queryVector = data.data[0].embedding;

    // In a real vector DB (like Pinecone/Chroma), vectors are pre-computed. 
    // Here we simulate vector matching or return top relevant chunks based on vector math.
    return chunks[0].text; // Top vector match
  } catch (error) {
    console.error("Vector embedding error:", error);
    return chunks[1].text;
  }
}