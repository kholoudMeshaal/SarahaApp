import joi from "joi"
import { signUpSchema } from "../../module/user/user.validation.js";



export const validation = (Schema)=>{
    return (req , res , next)=>{
const errorResults = []
    for (const key of Object.keys(Schema)) {
         const {error} = Schema[key].validate(req[key], {abortEarly: false})
    if (error){
        error.details.forEach((err)=>{
            errorResults.push({
                message: err.message,
                path: err.path[0], 
                key
            })
        })
        if(errorResults.length){
    return res.status(400).json({ message: "validation error", error:errorResults });
        }
    }   
    }
    next()
}
}