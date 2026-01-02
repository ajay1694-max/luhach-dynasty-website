
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { findPath, PersonRecord } from "@/lib/genealogyUtils";

// Initialize the Gemini API
// Note: In production (Netlify), ensure GEMINI_API_KEY is set in environment variables.
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        if (!apiKey) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const { messages, selectedPersonIds } = await req.json();

        // 1. Load context data (History PDF text and Genealogy Index)
        const historyPath = path.join(process.cwd(), "src/lib/data/history.txt");
        const historyText = await fs.readFile(historyPath, "utf-8");

        const indexPath = path.join(process.cwd(), "src/lib/data/genealogy_index.json");
        const records: PersonRecord[] = JSON.parse(await fs.readFile(indexPath, "utf-8"));

        // 2. Identify mentioned persons in the query to provide "Contextual RAG"
        const lastMessage = messages[messages.length - 1].content.toLowerCase();
        const relevantPersons: PersonRecord[] = [];

        // Simple search for names mentioned in the message
        // Note: This is a basic approach. In a more advanced version, we could use Fuse.js or an LLM to extract names.
        if (lastMessage.length > 3) {
            // Only search if message is long enough
            const searchTerms = lastMessage.split(/\s+/).filter((s: string) => s.length > 3);
            for (const term of searchTerms) {
                const matches = records.filter(r => r.n.toLowerCase().includes(term)).slice(0, 3);
                relevantPersons.push(...matches);
            }
        }

        // 3. Prepare Relationship Context if 2 people are selected or mentioned
        let relationshipContext = "";
        if (selectedPersonIds && selectedPersonIds.length === 2) {
            const p1 = records.find(r => r.id === selectedPersonIds[0]);
            const p2 = records.find(r => r.id === selectedPersonIds[1]);

            if (p1 && p2) {
                const genePath = findPath(records, p1.id, p2.id);
                if (genePath) {
                    relationshipContext = `Relationship path between ${p1.n} (Village: ${p1.v}) and ${p2.n} (Village: ${p2.v}):\n`;
                    relationshipContext += genePath.map(p => `${p.n} (Gen: ${p.g}, Village: ${p.v})`).join(" -> ");
                    relationshipContext += "\n\nExplain this relationship in terms of common ancestors and generations.";
                } else {
                    relationshipContext = `No direct genealogy path found between ${p1.n} and ${p2.n} in the database. They might be from different branches or have missing links.`;
                }
            }
        }

        // 4. Construct System Prompt
        const systemPrompt = `
      You are "Jarvis", the AI historian and genealogist for the Luhach Dynasty. 
      Your goal is to answer questions about the Luhach family using the historical records and genealogy database provided below.

      DATABASE INFORMATION (10,061 persons indexed):
      - We have a full record of 10,061 people across 46 villages.
      - The founder is Lal Singh (Generation 1).
      - Primary migration originated from Nandha.

      LITERAL HISTORY FROM PDF (Extracted):
      ---
      ${historyText} 
      ---

      ${relationshipContext ? `GENEALOGY PATH CONTEXT:\n${relationshipContext}\n---` : ""}

      ${relevantPersons.length > 0 ? `RELEVANT PEOPLE MENTIONED IN CHAT:\n${relevantPersons.map(p => `- ${p.n} from ${p.v} (Gen: ${p.g}, Father: ${p.fn}, Notes: ${p.m})`).join("\n")}\n---` : ""}

      STRICT GUIDELINES:
      - Use the provided history text for all factual historical queries (Lal Singh, Jadwa, Tomar Rajputs, etc.).
      - If you are explaining a relationship, trace it step-by-step using the path provided.
      - Answer in a mix of Hindi and English as preferred by the user.
      - Always give credit to the source: "लुहाच वंश का इतिहास" by Colonel Karmbir Singh Luhach.
      - If you don't found specific record, suggest they check the Visualiser map.
    `;

        // 5. Call Gemini 1.5 Flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare conversation history
        const geminiMessages = messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));

        // Start Chat
        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "Understood. I am Jarvis, the Luhach Dynasty AI. I will use the provided history and genealogy data to answer your questions accurately." }] },
                ...geminiMessages.slice(0, -1) // All previous messages except the current one
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(messages[messages.length - 1].content);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
