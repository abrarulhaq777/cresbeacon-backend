import express from "express";
import { expoSaveToken, getSOS, login, registerAdmin, sendSOS } from "../controller/sosController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", login);
router.post("/sos", sendSOS);
router.post("/expo-token",expoSaveToken);
router.post("/get-sos",getSOS);


export default router;
