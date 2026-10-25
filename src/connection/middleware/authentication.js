import jwt from "jsonwebtoken";
import { findOne } from "../../DB/service/DB.service.js";
import userModel from "../../DB/models/user.model.js";
import * as DbService from "../../DB/service/DB.service.js";

export const authentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("token not exist", { cause: 400 });
  }

  const decode = jwt.verify(authorization, "kholoud");
  if (!decode?.id) {
    throw new Error("invalid token", { cause: 400 });
  }

  const user = await DbService.findOne({
    model: userModel,
    filter: { email: decode.email.toLowerCase() },
  });

  if (!user) {
    throw new Error("User not found", { cause: 400 });
  }

  if (
    user.changeCredentialAt &&
    Math.floor(user.changeCredentialAt.getTime() / 1000) > decode.iat
  ) {
    throw new Error("token is expired", { cause: 400 });
  }

  req.user = user;

  next();
};
