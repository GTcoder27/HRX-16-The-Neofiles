import express from "express";
import { DIYmodel } from "../controllers/DIYmodel.js";


const router = express.Router();

router.post("/DIYmodel", DIYmodel);

export default router;










