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

//Ligando o Mongo
const mongoClient = new MongoClient(process.env.MONGO_URI);
try{
    await mongoClient.connect();
}catch(err){
    console.log("Erro ao conectar no Mongo",err);
}
db = mongoClient.db("MyWallet");


app.listen(5000, ()=>console.log("Rodando na porta 5000"));