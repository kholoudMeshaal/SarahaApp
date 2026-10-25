import mongoose from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../enum/user.enum.js";

const userSchema = new mongoose.Schema({
  fname: {
    trim: true,
    minlength: 3,
    maxlength: 20,
    type: String,
    required: true,
  },
  lname: {
    trim: true,
    minlength: 3,
    maxlength: 20,
    type: String,
    required: true,
  }, 
  email: {
    trim: true,
    lowercase: true,
    type: String,
    required: true,
    unique: true
}, password: {
    trim: true,
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
     min: 20,
    max: 60
}, 
gender: {
    type: String,
    required: true,
    enum: Object.values(genderEnum),
     default: genderEnum.male,
}, 
profileImage: String,
coverImages : 
    [String]
,
phone:{
type:String
},
role: { 
    type: String,
    enum: Object.values(roleEnum),
    default: roleEnum.user,
},
provider:{
    type: String,
    enum:Object.values(providerEnum) ,
    default: providerEnum.system,
} , 
isConfirmed: {
    type: Boolean,
    default: false, 
 } , 
changeCredentialAt: Date
 }
,
 { timestamps: true ,
    strict: true,
    strictQuery: true , 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
} 
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel