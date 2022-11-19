import dayjs from "dayjs";
import {walletSchena } from "../index.js";
import { wallet, session } from "../database/db.js";
export async function carteira (req, res)  {
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
}

export async function adicionandoMovimentacao(req, res) {
    const {description, tipo, valor, email} = req.body;
    try{
        await wallet.insertOne({description, tipo, valor, email, data: dayjs().format('DD/MM')});
       return res.status(201).send("Movimentacao gerada com sucesso");
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}