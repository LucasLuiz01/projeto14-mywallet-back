import { cadastroSchena } from "../index.js";

export function cadastroSchenaValidation(req,res,next){
    const validation = cadastroSchena.validate(req.body, {abortEarly:false})
   
    if(validation.error){
        const erro = validation.error.details.map(detail => detail.message);
        console.log(erro);
        return res.status(500).send(erro);
    }
    next();
}
