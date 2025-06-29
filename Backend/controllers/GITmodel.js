import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from "cors";
import axios from 'axios';
import express from 'express';

const app = express();

dotenv.config();
app.use(cors());

const GOOGLE_API_KEY = process.env.GEMINI_API;
if (!GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY environment variable not set.");
}
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);


const SYSTEM_PROMPT = `
User will give you a github link and on the basis of that you have to evaluate the project on the basis of topic of that project and give the evaluation in the form of a json object.

IMPORTANT:Give the score out of 5. 


`;


function extractJSON(text) {
    const cleanText = text.trim();
    try {
        return JSON.parse(cleanText);
    } catch (err) {
        const jsonMatch = cleanText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                const jsonStr = jsonMatch[1].trim();
                return JSON.parse(jsonStr);
            } catch (parseErr) {
                throw new Error(`Invalid JSON in markdown: ${parseErr.message}`);
            }
        }
        const objectMatch = cleanText.match(/({[\s\S]*})/);
        if (objectMatch && objectMatch[1]) {
            try {
                return JSON.parse(objectMatch[1]);
            } catch (parseErr) {
                throw new Error(`Could not parse a valid JSON object from the response.`);
            }
        }
        throw new Error("No valid JSON found in the model's response.");
    }
}


export const GITmodel = async (req, res) => {

    const { projectinfo, githublink } = req.body;
    
    // console.log(projectinfo, githublink);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            responseMimeType: "application/json",
        }
    });


    const userTopic = `Project Info : ${projectinfo}, githublink : ${githublink}`;

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT }]
            },
            {
                role: "model",
                parts: [{ text: "Understood. I will respond only in the structured JSON format as instructed." }]
            }
        ]
    });

    try {
        console.log("Sending prompt to the model...");
        const result = await chat.sendMessage(userTopic);
        const response = result.response;
        const json = extractJSON(response.text());
        // console.log(json);
        console.log("✅ Successfully received and parsed project idea:");
        res.send(json);

    } catch (error) {
        console.error("❌ Error during generation:", error.message);
    }


}


