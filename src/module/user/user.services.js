import { compareSync, hashSync } from "bcrypt";
import { decrypt, Encrypt } from "../../connection/security/encrypt.js";
import * as DbService from "../../DB/service/DB.service.js";
import userModel from "../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import joi from "joi";
import multer from "multer";
import { authorization } from "../../connection/middleware/authorization.js";
import { setValue } from "../../DB/service/redis.service.js";
import { generate_otp, sendEmail } from "../../DB/service/sendEmail.js";

export const signup = async (req, res, next) => {
  const { fname, lname, email, password, age, phone, gender } = req.body;

  if (
    !req.files ||
    !req.files.attachments ||
    req.files.attachment.length === 0
  ) {
    throw new Error("please upload at least one file");
  }
  if (await userModel.findOne({ email: email.toLowerCase() })) {
    throw new Error("Email already exists");
  }

const otp = await generate_otp()
await setValue({
  key:`otp::${email}`, 
  value: hashSync(otp,12),
  ttl: 2*60
})
await sendEmail({
  to : `kholoudhamdy01@gmail.com` ,
  subject: " احلي مسا عليك "  , 
  html: `<h1>otp:${otp}</h1>`
})


  const paths = [];

  for (const file of req.files.attachments) {
    paths.push(file.path);
  }

  const user = await DbService.create({
    model: userModel,
    data: {
      fname,
      lname,
      email: email.toLowerCase(),
      password,
      age,
      phone: Encrypt(phone),
      gender,
      profileImage: req.files.attachment[0].path,
      coverImages: paths,
    },
  });
  return res.status(201).json({ message: "user created successfully", user });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await DbService.findOne({
    model: userModel,
    filter: { email: email.toLowerCase() },
  });

  const access_token = jwt.sign(
    { id: user._id, email: user.email },
    "kholoud",
    { expiresIn: "7 day" },
  );
  const refresh_token = jwt.sign(
    { id: user._id, email: user.email },
    "kholoud",
  );
  return res
    .status(200)
    .json({ message: "done", token: { access_token, refresh_token } });
  if (!user) {
    throw new Error("User not found");
  }
  // if (user.isConfirmed !== true) {
  //   return res.status(400).json({ message: "Please confirm your email first" });
  // }
  if (!compareSync(password, user.password)) {
    //   throw new Error("Invalid password");
    return res.status(400).josn({ message: "invalid pass" });
  }

  return res
    .status(200)
    .json({
      message: "User signed in successfully",
      user: { ...user._doc, phone: decrypt(user.phone) },
    });
};

export const getProfile = async (req, res, next) => {
  return res
    .status(200)
    .json({ message: "User signed in successfully", user: req.user });
};

export const sharedProfile = async (req, res, next) => {
  const { id } = req.params;
  let user = await DbService.findById({
    model: userModel,
    id: id,
    options: { password: 0 },
  });

  if (!user) {
    throw new Error("User not found", { cause: 400 });
  }
  user.phone = decrypt(user.phone);

  return res.status(200).json({ message: "User signed in successfully", user });
};

export const updateProfile = async (req, res, next) => {
  const { fname, lname, age, phone, gender } = req.body;

  let updateData = {};
  if (fname !== undefined) updateData.fname = fname;
  if (lname !== undefined) updateData.lname = lname;
  if (age !== undefined) updateData.age = age;
  if (phone !== undefined) updateData.phone = Encrypt(phone);
  if (gender !== undefined) updateData.gender = gender;

  let user = await DbService.findByIdAndUpdate({
    model: userModel,
    id: req.user._id,
    update: updateData,
  });

  return res.status(200).json({
    message: "User updated successfully",
    user,
  });
};

export const refreshToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("refresh token is required");
  }
  const decode = jwt.verify(authorization, "kholoud");
  if (!decode?.id) {
    throw new Error("invalid token", { cause: 400 });
  }

  return res.status(200).json({ message: "done", decode });

  const user = await DbService.findOne({
    model: userModel,
    filter: { email: decode.email.tolowerCase() },
  });

  if (!user) {
    throw new Error("User not found", { cause: 400 });
  }

  const access_token = jwt.sign(
    { id: user._id, email: user.email },
    "kholoud",
    { expiresIn: "7 day" },
  );

  if (Math.floor(user.changeCredentialAt.getTime() / 1000) > decoded.iat) {
    throw new Error("token is expired", { cause: 400 });
  }

  return res
    .status(200)
    .json({ message: "User signed in successfully", user: req.user });
};

export const logOut = async (req, res, next) => {
  const {flag} = req.query;

  if (flag && flag === "all") {
    req.user.changeCredentialAt = new Date();
    await req.user.save();
    await dbService.deleteMany({
      model: revokedTokenModel,
      filter: { userId: req.user._id },
    });
  }else {
    await setValue({ 
      key:`revokedToken::${req.user._id}:: ${req.decoded.jti}`,
      value: `${req.decoded.jti}`,
      ttl: req.decoded.exp - Math.floor((Date.now() / 1000))
 })
  }


  return res
    .status(200)
    .json({ message: "User logged out successfully", user: req.user });
};
