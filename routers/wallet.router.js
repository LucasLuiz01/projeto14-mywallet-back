import { carteira, adicionandoMovimentacao } from "../controllers/wallet.controller.js";
import {Router} from "express";
import { walletSchenaValidation } from "../middlewares/walletSchenaValidation.js";

const router = Router();
//POST 
router.post("/wallet",walletSchenaValidation, adicionandoMovimentacao);
//GET
router.get("/wallet", carteira);

export default router;
