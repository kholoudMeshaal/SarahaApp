import express from "express";
import { connectionDB } from "./DB/connection.js";
import userModel from "./DB/models/user.model.js";
import userRouter from "./module/user/user.controller.js";
import { connectionRedis, redisClient } from "./DB/connection.redis.js";
import { setValue } from "./DB/service/redis.service.js";

const app = express();
const port = 3013;

const bootstrap = async () => {
  app.use(express.json());
  app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to my app" });
  });

  await connectionDB();
 await connectionRedis();
//  await redisClient.set("name", "kholoud");
// await setValue({ key: "gender", value: "female" });


   userModel()
app.use("/user", userRouter);

  app.use("{/*demo}", (req, res) => {
 throw new Error(`Url: ${req.originalUrl} with method: ${req.method} not found ` , {cause: 404});
  });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.cause || 500).json({ error: err.message , stack: err.stack });
});

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};


export default bootstrap;