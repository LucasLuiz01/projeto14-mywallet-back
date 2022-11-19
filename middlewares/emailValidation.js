import { login } from "../database/db.js";
export async function  emailValidation(req,res,next){
    const {email} = req.body;
    const validacao = await login.findOne({email});
    if(validacao){
        return res.status(409).send("Email já existente");
    }
    next();
}