import express from "express";
import { expoSaveToken, getSOS, login, registerUser, saveComplaint, sendMessage, sendSOS } from "../controller/sosController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/sos", sendSOS);
router.post("/expo-token",expoSaveToken);
router.get("/get-sos",getSOS);
router.post("/chat",sendMessage);
router.post("/save-complaint",saveComplaint);




export default router;
