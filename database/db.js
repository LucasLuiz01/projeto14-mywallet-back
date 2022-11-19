import { MongoClient } from "mongodb";
import dotenv from "dotenv";
//Variaveis Globais
let db;
//configurando Dotenv
dotenv.config();
//Ligando Mongo
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