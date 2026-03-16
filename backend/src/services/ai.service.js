const Groq = require("groq-sdk")

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

async function generateResponse(prompt , chatHistory = []) {

    const SYSTEM_PROMPT = `You are an expert code reviewer and software engineer with 10+ years of experience.

Your job is to help users with their code:
- Explain code in simple, easy-to-understand language
- Find bugs and suggest fixes  
- Optimize code for better performance
- Add proper comments and documentation
- Suggest best practices and improvements

Rules:
- Always respond in clear, structured format
- Use examples wherever possible
- Keep responses concise but complete
- If code has errors, point them out clearly
- If user asks a general question, answer helpfully`


//  chatHistory 
 const formattedHistory = chatHistory.map(msg => ({
        role: msg.role === "model" ? "assistant" : "user",
        content: msg.content
    }))
 

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...formattedHistory ,   // history 
            { role: "user",   content: prompt }
        ],
    })

    return response.choices[0].message.content
    //                  ↑ Groq ka response format
}


module.exports = generateResponse