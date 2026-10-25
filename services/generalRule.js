import joi from "joi";
import { Types } from "mongoose";

export const generalRule = {
     id: joi.string().custom((value, helpers) => {
          return Types.ObjectId.isValid(value) ? value : helpers.message("invalid id");
        }),
    email: joi.string().email(),
    password: joi.string(),
  
    files :
  
 joi.object({
    fieldname :  joi.string().required() , 
    encoding:  joi.string().required() , 
    originalname:  joi.string().required(), 
    mimetype:  joi.string().required(), 
    path:  joi.string(), 
    destination:  joi.string() , 
    filename: joi.string(), 
    size: joi.number()
    }).required().messages({
          "any.required": "file is required"
        })
      
}