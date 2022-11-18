//Importacao bibilioteca
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { logar, cadastro } from "./controllers/usuario.controller.js";
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
const walletSchena = joi.object({
    valor: joi.number().required().min(1),
    tipo: joi.boolean().required(),
    description: joi.string().required().min(3),
    email: joi.string().required().min(5).email(),
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
const wallet = db.collection("wallet");
export const session = db.collection("session");
//POSTS 
app.post("/login", logar);
app.post("/cadastro", cadastro);
app.post("/wallet", async(req, res) => {
    const {description, tipo, valor, email} = req.body;
   const validation = walletSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const err = validation.error.details.map(detail => detail.message);
        console.log(err);
        return res.status(409).send(err);
    }
    try{
        await wallet.insertOne({description, tipo, valor, email, data: dayjs().format('DD/MM')});
       return res.status(201).send("Movimentacao gerada com sucesso");
    }catch(err){
        console.log(err);
    }
});

//GETS
app.get("/cadastro", async(req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '')
    console.log(token)
    const user = await session.findOne({token})
    try{
        const usuario = await login.findOne({email: user.email});
        return res.status(201).send(usuario);
    }catch(err){
        console.log(err);
       return res.sendStatus(500);
    }
});
app.get("/wallet", async(req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '')
    const user = await session.findOne({token})
    try{
        const movimentacao = await wallet.find({email: user.email}).toArray();
        return res.status(201).send(movimentacao);
    }catch(err){
        console.log(err);
       return res.sendStatus(500);
    }
});



app.listen(5000, ()=>console.log("Rodando na porta 5000"));
