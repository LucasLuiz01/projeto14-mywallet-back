import { walletSchena } from "../index.js";
export function walletSchenaValidation(req, res, next){
    const validation = walletSchena.validate(req.body, {abortEarly: false})
    if(validation.error){
        const err = validation.error.details.map(detail => detail.message);
        console.log(err);
        return res.status(409).send(err);
    }
    next();
}
 