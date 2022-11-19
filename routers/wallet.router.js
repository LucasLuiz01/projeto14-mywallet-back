import { carteira, adicionandoMovimentacao } from "../controllers/wallet.controller.js";
import {Router} from "express";

const router = Router();
//POST 
router.post("/wallet", adicionandoMovimentacao);
//GET
router.get("/wallet", carteira);

export default router;
