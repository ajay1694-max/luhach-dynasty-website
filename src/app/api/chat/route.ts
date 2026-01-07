
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { findPath, PersonRecord } from "@/lib/genealogyUtils";
import { historyText } from "@/lib/data/historyData";
import genealogyData from "@/lib/data/genealogy_index.json";

// Initialize the Gemini API
// Note: In production (Netlify), ensure GEMINI_API_KEY is set in environment variables.
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        if (!apiKey) {
            console.error("API Key missing");
            return NextResponse.json({ error: "API Key not configured in Netlify Environment Variables" }, { status: 500 });
        }

        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { messages, selectedPersonIds } = body;

        // 1. Load context data (Imported directly to avoid filesystem issues in Serverless)
        const records = genealogyData as unknown as PersonRecord[];

        // 2. Identify mentioned persons in the query to provide "Contextual RAG"
        const lastMessage = messages[messages.length - 1].content.toLowerCase();
        const relevantPersons: PersonRecord[] = [];

        // Simple search for names mentioned in the message
        if (lastMessage.length > 3) {
            // Only search if message is long enough
            const searchTerms = lastMessage.split(/\s+/).filter((s: string) => s.length > 3);
            for (const term of searchTerms) {
                // Limit matches to avoid token overflow
                const matches = records
                    .filter(r => r.n.toLowerCase().includes(term))
                    .slice(0, 3);
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
      - Primary migration originated from Naandha.

      LITERAL HISTORY FROM PDF (Extracted):
      ---
      ${historyText.slice(0, 50000)} ... (truncated for context limit if needed)
      ---

      ${relationshipContext ? `GENEALOGY PATH CONTEXT:\n${relationshipContext}\n---` : ""}

      ${relevantPersons.length > 0 ? `RELEVANT PEOPLE MENTIONED IN CHAT:\n${relevantPersons.map(p => `- ${p.n} from ${p.v} (Gen: ${p.g}, Father: ${p.fn}, Notes: ${p.m})`).join("\n")}\n---` : ""}

      STRICT GUIDELINES:
      - **LANGUAGE**: You must be **BILINGUAL**. Answer primarily in **HINDI** (Devanagari) but provide **ENGLISH** translations for key details or difficult terms.
      - example: "लाल सिंह (Lal Singh) ने 860 ईस्वी में नाँधा गाँव की स्थापना की।"
      - Use the provided history text for all factual historical queries.
      - If you are explaining a relationship, trace it step-by-step using the path provided.
      - Always give credit to the source: "लुहाच वंश का इतिहास" by Colonel Karmbir Singh Luhach.
      - If specific info is missing, suggest checking the Visualiser map.
    `;

        // 5. Call Gemini 1.5 Flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare conversation history
        const geminiMessages = messages.map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "Understood. I am Jarvis, the Luhach Dynasty AI. I will use the provided history and genealogy data to answer your questions accurately." }] },
                ...geminiMessages.slice(0, -1)
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
