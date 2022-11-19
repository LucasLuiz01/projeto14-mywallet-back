import {Router} from "express";
import { logar, cadastro, informacoes } from "../controllers/usuario.controller.js";
const router = Router();
//POSTS 
router.post("/login", logar);
router.post("/cadastro", cadastro);
//GETS
router.get("/cadastro", informacoes);

export default router;