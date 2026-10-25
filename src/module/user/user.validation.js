import joi from "joi";
import { generalRule } from "../../../services/generalRule.js";

export const signUpSchema = {
  body: joi
    .object({
      fname: joi.string().required(),
      lname: joi.string().required(),
      email: generalRule.email.required(),
      password: generalRule.password.required(),
    //   confirmPassword: joi.string().valid(joi.ref("password")).required(),
      age: joi.number().required(),
      phone: joi.string().required(),
      gender: joi.string().valid("male" , "female").required(),
    })
    .required().messages({
      "any.required": "body is empty"
    }),
    
  query: joi
    .object({
      flag: joi.boolean().required(),
    })
    .required(),
// for fieldsmethod
files : 
joi.object({
  attachment: joi.array().items(generalRule.files.required()).messages({
      "any.required": "file is required"
    }),
  attachments: joi.array().items(generalRule.files.required()).messages({
      "any.required": "file is required"
    })
})


}

export const signInSchema = {
  body: joi
    .object({ 
      email: generalRule.email.required(),
      password: generalRule.password.required(),
    })
    }
    
export const refreshTokenSchema = {
  headers: joi
    .object({
      authorization: joi.string(),
      connection: joi.string(),
      "accept-encoding": joi.string(),
      accept: joi.string(),
      "user-agent": joi.string(),
      host: joi.string(),
      "postman-token": joi.string(),
      "content-length": joi.string(),
      "cache-control": joi.string()
    })
    .required()
}

export const sharedProfileSchema = {
  params: joi
    .object({ 
      id: generalRule.id.required(),
    
    }).required()
    }

export const updateProfileSchema = {
  body: joi
    .object({
      fname: joi.string(),
      lname: joi.string(),
       age: joi.number(),
      phone: joi.string(),
      gender: joi.string().valid("male" , "female"),
    })
    .required().messages({
      "any.required": "body is empty"
    }),

}