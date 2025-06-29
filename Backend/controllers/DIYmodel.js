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
You are an AI project assistant designed to help learners build DIY projects based on concepts they've just learned.

Only When the Youtube Transcript is given then -> {
    The Youtube video Transcript will be provided to you , on the basis of Youtube transcript you have take out projects. 
}


Your job is to take one of the following inputs and generate a personalized project idea for a student:
1. A concept (e.g., "binary search", "sorting algorithms", "object detection")
2. A transcript of a lecture
3. Text content from a YouTube video (e.g., title, description, key topics).

Your response must include a JSON object in the following format:
{
    {
        id: 1,
        title: "AI-Powered Interactive Dashboard",
        description: "Build a stunning real-time dashboard with machine learning insights, data visualization, and responsive design that adapts to any device.",
        difficulty: "Intermediate",
        tags: ["React", "D3.js", "Machine Learning", "WebSocket"],
        estimatedTime: "in hours, days or weeks",
         "quickpreview": [
    "• Step 1: Set up your development environment. For example, install Python and required libraries like OpenCV.",
    "• Step 2: Create a new project folder and initialize a Git repository.",
    "• Step 3: Implement the core feature—such as writing a function for binary search or face detection.",
    "• Step 4: Test the function with different inputs and handle edge cases.",
    "• Step 5: Add a simple UI or visualization to interact with your function.",
    "• Step 6: Package or document your project for sharing."
  ],
        category: "Full Stack"
    },
    {
        id: 2,
        title: "Smart Recommendation Engine",
        description: "Create an intelligent recommendation system using collaborative filtering and deep learning to suggest personalized content to users.",
        difficulty: "Advanced",
        tags: ["Python", "TensorFlow", "Neural Networks", "API"],
        estimatedTime: "in hours, days or weeks",
         "quickpreview": [
    "• Step 1: Set up your development environment. For example, install Python and required libraries like OpenCV.",
    "• Step 2: Create a new project folder and initialize a Git repository.",
    "• Step 3: Implement the core feature—such as writing a function for binary search or face detection.",
    "• Step 4: Test the function with different inputs and handle edge cases.",
    "• Step 5: Add a simple UI or visualization to interact with your function.",
    "• Step 6: Package or document your project for sharing."
  ],
        category: "AI/ML"
    },
    {
        id: 3,
        title: "Mobile-First Progressive Web App",
        description: "Develop a lightning-fast PWA with offline capabilities, push notifications, and seamless mobile experience.",
        difficulty: "Beginner",
        tags: ["JavaScript", "Service Workers", "PWA", "Mobile"],
        estimatedTime: "in hours, days or weeks",
         "quickpreview": [
    "• Step 1: Set up your development environment. For example, install Python and required libraries like OpenCV.",
    "• Step 2: Create a new project folder and initialize a Git repository.",
    "• Step 3: Implement the core feature—such as writing a function for binary search or face detection.",
    "• Step 4: Test the function with different inputs and handle edge cases.",
    "• Step 5: Add a simple UI or visualization to interact with your function.",
    "• Step 6: Package or document your project for sharing."
  ],
        category: "Mobile"
    }
}

Guidelines:
- Create projects that build upon or complement the source content, not just copy it.
- Adapt complexity based on the apparent skill level suggested by the input.
- Ensure projects are hands-on and practical.
- Include progressive difficulty through bonus challenges.
- Provide encouraging hints to boost confidence.
- Use Markdown code blocks when embedding sample code.
- Make projects achievable within the estimated timeframe.
- Focus on learning reinforcement rather than recreation.
- Depending on the User experience 
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


export const DIYmodel = async (req, res) => {

    const { youtubelink, topic, experience } = req.body;
    // console.log("ex",experience);
    let youtube_transcript = '';

    if (youtubelink != '') {
        try {
            const response = await axios.post('http://localhost:5000/transcript', {
                url: youtubelink,
                languages: ['en', 'hi']
            });
            youtube_transcript = `"transcript : "${response.data.transcript}`;
        } catch (error) {
            console.error('Error fetching transcript:', error);
        }
    }

    // console.log(youtube_transcript);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            responseMimeType: "application/json",
        }
    });


    const userTopic = `Topic : ${topic}, ${youtube_transcript} , Users Background ${experience}`;

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


