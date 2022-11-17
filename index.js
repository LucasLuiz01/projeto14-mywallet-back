//Importacao bibilioteca
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";
//Configuracoes iniciais
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//Variaveis Globais
let db;
//Erros Schema
const cadastroSchena = joi.object({
    nome: joi.string().required().min(3).max(25),
    email: joi.string().required().min(5).email(),
    senha: joi.string().required().min(3).max(25),
})
const loginSchena = joi.object({
    email: joi.string().required().min(5).email(),
    senha: joi.string().required().min(3).max(25),
})
const walletSchena = joi.object({
    valor: joi.number().required().min(1),
    tipo: joi.string().required().min(3).valid("entrada", "saida"),
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
const login = db.collection("usuario");
const wallet = db.collection("wallet");
const session = db.collection("session");
//POSTS 
app.post("/login", async(req, res) => {
    const {email, senha} = req.body;
    const validation = loginSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const erro = validation.error.details.map(detail => detail.message);
        console.log(erro);
        res.status(409).send(erro);
    }
    try{
        
    }catch(err){
        console.log(err);
    }
});
app.post("/cadastro", async(req, res) => {
    const {nome, senha, email} = req.body;
    const validation = cadastroSchena.validate(req.body, {abortEarly:false})
   
    if(validation.error){
        const erro = validation.error.details.map(detail => detail.message);
        console.log(erro);
        return res.status(500).send(erro);
    }
    const validacao = await login.findOne({email});
    if(validacao){
        return res.status(409).send("Email já existente");
    }

    try{
        const senhaCriptografada = bcrypt.hashSync(senha, 7);
        console.log(senhaCriptografada);
        await login.insertOne({nome, email, senha: senhaCriptografada});
        res.status(201).send("Usúario Criado")
    }catch(err){
        console.log(err);
    }
});
app.post("/wallet", async(req, res) => {
    const {email, tipo, valor} = req.body;
   const validation = walletSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const err = validation.error.details.map(detail => detail.message);
        console.log(err);
        return res.status(409).send(err);
    }
    try{
        await wallet.insertOne({email, tipo, valor});
       return res.status(201).send("Movimentacao gerada com sucesso");
    }catch(err){
        console.log(err);
    }
});

//GETS
app.get("/wallet", async(req, res) => {
    const email = req.headers.email;
    if(!email){
        return res.status(500).send("Envie um email");
    }
    try{
        const movimentacao = await wallet.find({email}).toArray();
        return res.status(201).send(movimentacao);
    }catch(err){
        console.log(err);
       return res.sendStatus(500);
    }
});



app.listen(5000, ()=>console.log("Rodando na porta 5000"));
