import express from "express";
import { DIYmodel } from "../controllers/DIYmodel.js";
import { speech_to_text } from "../controllers/speech_to_text.js";


const router = express.Router();

router.post("/DIYmodel", DIYmodel);
router.post("/speech_to_text",speech_to_text);  // speech to text

export default router;










