import { NextRequest, NextResponse } from "next/server";
import {generateText} from "ai"
import {createGoogleGenerativeAI} from "@ai-sdk/google"
import { db } from "@/firebase/admin";

// Initialize Google AI with API key
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_API_KEY!
});
export async function GET() {
    try {
        return NextResponse.json({
            success: true,
            message:"thank you for using our service",
        },{
            status: 200,
        })
    } catch (error) {
        
    }
}


export async function POST(req:NextRequest) {
    const {type,role,level,techstack,amount,userid} = await req.json();
    try {
        const {text} = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `
You are an expert interview question generator. Your task is to generate exactly ${amount} concise, engaging, and role-specific questions for the position of ${role} at ${level} level, focusing on ${techstack}.

⚠️ IMPORTANT INSTRUCTIONS:
- Your response MUST be a valid **JSON array of plain text strings**.
- DO NOT include any introductory text, explanations, numbering, special characters, or formatting.
- ONLY output the array like this:
["Question 1", "Question 2", "Question 3"]

Example (for 3 questions):
["What is JavaScript?","Explain closures in JavaScript.","What is event bubbling?"]

✅ Only return the JSON array—nothing else.
❌ No text before or after the array.
❌ No numbering in the questions.
❌ No special characters like *, -, :, etc.

Now, generate ${amount} questions accordingly.
and remoe json markdown
`


        })

        const interview = {
            role,
            type,
            level,
            techstack:techstack.split(","),
            questions:JSON.parse(text),
            userid:userid,
            finalized:true,
            createdAt:new Date().toISOString()
        }

        await db.collection("interviews").add(interview);

        return NextResponse.json({
            success: true,
            message: "Interview questions generated successfully.",
            data: JSON.parse(text),
        }, {
            status: 200,
        })
    } catch (error) {
        console.error("Error in POST /api/vapi/generate:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while processing your request.",
        }, {
            status: 500,
        });
    }
}