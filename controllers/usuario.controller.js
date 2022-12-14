import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";
import { login, session } from "../database/db.js";

export async function logar (req, res) {
    const {email, senha} = req.body;
    const user = await login.findOne({email});
    if(user && bcrypt.compareSync(senha, user.senha)){
        const token = uuidV4();
        await session.insertOne({email, token})
        res.status(200).send(token);
    }else {
        return res.status(409).send("Usuario invalido");
    }
}
export async function cadastro (req, res)  {
    const {nome, senha, email} = req.body;
    try{
        const senhaCriptografada = bcrypt.hashSync(senha, 7);
        console.log(senhaCriptografada);
        await login.insertOne({nome, email, senha: senhaCriptografada});
        res.status(201).send("Usúario Criado")
    }catch(err){
        console.log(err);
    }
}
export async function informacoes (req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '')
    console.log(token)
    const user = await session.findOne({token})
    try{
        const usuario = await login.findOne({email: user.email});
        delete usuario.senha
        return res.status(201).send(usuario);
    }catch(err){
        console.log(err);
       return res.sendStatus(500);
    }
}