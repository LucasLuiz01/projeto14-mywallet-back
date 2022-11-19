import { loginSchena } from "../index.js";
export function loginSchenaValidation(req,res,next){
    const validation = loginSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const erro = validation.error.details.map(detail => detail.message);
        console.log(erro);
        return res.status(401).send(erro);
    }
    next();
}
