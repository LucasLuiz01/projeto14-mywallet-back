import joi from "joi";
import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";
import { login, session, cadastroSchena } from "../index.js";
const loginSchena = joi.object({
    email: joi.string().required().min(5).email(),
    senha: joi.string().required().min(3).max(25),
})
export async function logar (req, res) {
    const {email, senha} = req.body;
    const validation = loginSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const erro = validation.error.details.map(detail => detail.message);
        console.log(erro);
        return res.status(409).send(erro);
    }
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
}