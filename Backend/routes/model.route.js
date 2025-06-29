import express from "express";
import { DIYmodel } from "../controllers/DIYmodel.js";
import { speech_to_text } from "../controllers/speech_to_text.js";
import { GITmodel } from "../controllers/GITmodel.js";


const router = express.Router();

router.post("/DIYmodel", DIYmodel);
router.post("/GITmodel", GITmodel);
router.post("/speech_to_text",speech_to_text);  // speech to text

export default router;










