//Importacao bibilioteca
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import usuarioRouters from "./routers/usuario.router.js"
import walletRouters from "./routers/wallet.router.js"
//Configuracoes iniciais
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(usuarioRouters);
app.use(walletRouters);
//Erros Schema
export const cadastroSchena = joi.object({
    nome: joi.string().required().min(3).max(25),
    email: joi.string().required().min(5).email(),
    senha: joi.string().required().min(3).max(25),
})
export const walletSchena = joi.object({
    valor: joi.number().required().min(1),
    tipo: joi.boolean().required(),
    description: joi.string().required().min(3),
    email: joi.string().required().min(5).email(),
})
export const loginSchena = joi.object({
    email: joi.string().required().min(5).email(),
    senha: joi.string().required().min(3).max(25),
})


app.listen(5000, ()=>console.log("Rodando na porta 5000"));
