import { loginSchenaValidation } from "../middlewares/loginSchenaValidation.js";
import { cadastroSchenaValidation } from "../middlewares/cadastroSchenaValidation.js";
import {emailValidation} from "../middlewares/emailValidation.js"
import {Router} from "express";
import { logar, cadastro, informacoes } from "../controllers/usuario.controller.js";
const router = Router();
//POSTS 
router.post("/login",loginSchenaValidation, logar);
router.post("/cadastro",cadastroSchenaValidation,emailValidation, cadastro);
//GETS
router.get("/cadastro", informacoes);

export default router;