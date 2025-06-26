import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from "cors";
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
  "project_title": "string",
  "difficulty": "Beginner | Intermediate | Advanced",
  "domain": "Coding | Hardware | Design | Research | Mixed",
  "description": "Brief explanation of the project and how it relates to the source material",
  "inspired_by": "Brief note about what concept/video inspired this project (if applicable)",
  "steps": [
    "Step 1...",
    "Step 2...",
    "... etc"
  ],
  "technologies": ["list", "of", "tools", "used"],
  "estimated_time": "e.g., 2 hours / 3 days",
  "learning_objectives": ["What the student will learn from this project"],
  "hints": ["Tip 1...", "Tip 2..."],
  "bonus_challenges": ["Optional advanced features to implement"]
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
                // This fallback is less reliable, so the error is more generic
                throw new Error(`Could not parse a valid JSON object from the response.`);
            }
        }

        throw new Error("No valid JSON found in the model's response.");
    }
}

async function init() {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", 
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 2048,
            responseMimeType: "application/json",
        }
    });


    const userTopic = `
        "transcript": "hello all welcome to my channel this is Surya so in this video I want to share my Hest infosis specialist programmer interview experience so being from typ three College I'm very grateful to crack infosis best programmer role so without any delay let's get started with my interview experience so it is all started in my around June 18th I received a survey form for infosis specialist program application link so I fill the survey form and around in at the end of the June I received uh to to attempt the online assessment so in on July on July 7th I attempted the online assessment in which there are three coding questions uh so one is like simple logic question and another one is greedy question and another one is DB question one who is solving consistently on lead code code chef and code forces they can solve it the test is bit difficult like the uh the the level of coding questions given is bit so it it is bit exhausting but we need to solve it so I solved around two coding questions completely and in the third question I solved around eight out of 10 10 test cases so I was confident that I will receive the interview call uh so according to the previous experience like one who solved around one question completely and 80% in the second question and 70% in the third question they may receive the interview call so I'm I'm confident that I will get my interview call so in the August midweek I received that I cleared the online assessment and they said uh you will get a survey link to fill the uh locations to give interview so interview is offline we need to go to infosis office and give the interview and so I received the survey link and I filled uh Hyderabad and went to infosis Hyderabad office so it is uh raining on the day and I went there bit my slot is at uh morning 9:00 and I went to infosis office at 8:30 830 so uh uh at first the security guard checked all the documents uh the government ID proof and photoc copies so they didn't mention photocopies in the mail but they asked us photocopies in the gate after that they scanned our bags and one thing is like we need to carry our laptop and charger and mobile phone for the hotspot to the laptop we need to all the laptop and hotspot is our is ours only so we need to give the interview in the infosis office but the interview is online the panel member is connects with us in teams so after we I enter into the office so uh we went to Auditorium where all the candidates who needs to give interview sat there and HR came and she called our names and scheduled a online meet links so she gave a p room to me and I carried my laptop and charger to that room and uh the interview started in the online so there is only one round of interview and there is only one panel member so in this interview like uh it start with the formal introduction of interviewer uh he introduced himself and later he asked my uh my introduction so I introduced myself uh like I took around 2 to 3 minutes and introduce myself and later uh it uh he asked about my strength and weakness I explained that my strength and weakness and examples related to it like how how I can prove my strength and how I can justify my weakness so the weakness must be not uh not be technical weakness it must be outside or else it must be like something positive but not negative that will affect your interview so with this question uh and later uh he switched to the technical part at first he he asked me to rate myself in the all programming languages uh like in the Java and all I rated myself and he asked me why we need to justify why you rate yourself so I explain my reasons and justify my rating why I gave my rating and after that he scaned enti my resume my projects and my internship experience everything he scanned and he started asking the coding questions so first he asked me the oops Concepts like we went to went discussion on the oops everything the pillars and each of the pillar and explanation of the examples so it was uh it took some time and after that he went to the coding questions part he gave me first question is easy that is string reversal so I I explained the Brute Force approach and I Al I with that approach and I also told uh a optimal way of string reversal when the string is mutable like we can Traverse only the off of the string and reverse so with that uh so solution the interviewer is happy and he uh he asked me to continue to the code so he asked me to open the notepad and I wrote the code and he asked me to write uh time complexity and space complexity as well and he also explained me why why this time and why this space complexity and after that he asked me whether I'm comfortable to solve the second coding question I said yes I'm comfortable to solve so he gave me another coding question that is related to link list so he explained he asked he asked me also what are the different types of Link list before this coding question so explain him three different types single double and uh cyclic and after that he gave me the coding question that is insert a new node in a sorted link list order so I explained him your Brute Force approach and later I explain him my optimal approach and he asked me to solving the optimal coding question so I wrote the entire code in the optimal Cod optimal solution and explain him the time and space complexity so with this uh coding question he was impressed like he was he got some impression and he said uh the the coding questions this part is completed and later we went to we went on discussion on database so he asked me different types of database the relational and non- relational and he asked me the normalization part and and also the asset properties so I explained him and after that he asked me whether I know like non- relational databases like mongod de and all for which I said I I have an idea of mongodb but I didn't practice it any time so he didn't ask me anything on the Mong DB and later he asked me very few questions on my projects uh just why this projects and all this technology used and after the dbms and all he switched to managerial questions so the manager questions like uh why infosis uh what are your strength and weakness uh are you comfortable to relocate to any location and all so in this uh like with these questions like the interview is uh around like 40 to 45 minutes and uh it went uh very positively and everything went smooth so uh it went good and after that he said he's done with the interview so we thanked each other and later he asked me whether I have any questions or not for which I asked him how the specialist programmer projects will be there so he explained that specialist program will get good type of projects the development and all and after that he explained me his uh training experience in madas myour so he shared his uh training experience in myour campus and beautiful beautiness of myour Campus so with the discussion we thanked each other and and hang up from the call so yeah this is my honest interview experience of special programmer role uh the interviewer is friendly and it went very smooth so I I'm hoping a positive reply from the infosis so with that hope and I packed my things and came back to my home so I completed my interview on 24th August and I received a mail of selection uh saying congratulations sua on 29th August in just 5 days I received my result and I also got my joining date so this is my uh interview experience so if you have any doubts please do comment I will answer them in the comment section so any tips is like uh cracking the online assessment is the first big step to clear the questions are hard so please be practice consistently from last 2 3 months and solve them and interview is like uh medium level like based on the panel be confident and answer everything uh in your pos positive way so yeah thank you all thank you for watching"
    `;

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
        console.log(json);

        console.log("✅ Successfully received and parsed project idea:");
        // console.log(JSON.stringify(json, null, 2));
    } catch (error) {
        console.error("❌ Error during generation:", error.message);
    }
}

init().catch(console.error);
