//Importacao bibilioteca
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import { carteira, adicionandoMovimentacao } from "./controllers/wallet.controller.js";
import { logar, cadastro, informacoes } from "./controllers/usuario.controller.js";
//Configuracoes iniciais
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//Variaveis Globais
let db;
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
//Ligando o Mongo
const mongoClient = new MongoClient(process.env.MONGO_URI);
try{
    await mongoClient.connect();
}catch(err){
    console.log("Erro ao conectar no Mongo",err);
}
db = mongoClient.db("MyWallet");
//Collections
export const login = db.collection("usuario");
export const wallet = db.collection("wallet");
export const session = db.collection("session");
//POSTS 
app.post("/login", logar);
app.post("/cadastro", cadastro);
app.post("/wallet", adicionandoMovimentacao);

//GETS
app.get("/cadastro", informacoes);
app.get("/wallet", carteira);



app.listen(5000, ()=>console.log("Rodando na porta 5000"));
