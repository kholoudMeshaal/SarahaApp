import { Router } from "express";
import * as US from "./user.services.js";
import { authentication } from "../../connection/middleware/authentication.js";
import { authorization } from "../../connection/middleware/authorization.js";
import { roleEnum } from "../../enum/user.enum.js";
import { validation } from "../../connection/middleware/validation.js";
import { refreshTokenSchema, sharedProfileSchema, signInSchema, signUpSchema , updateProfileSchema } from "./user.validation.js";

import { multerLocal } from "../../connection/middleware/multer.js";
 //((((((((( validation b3d al multer )))))))))

const userRouter = Router();



userRouter.post("/signup",  
multerLocal({cunstomPath: "admins" , customTypes:['image/jpeg']}).fields([
   { name: "attachment" , maxCount : 1},
  { name: "attachments" , maxCount : 100},
]),
validation(signUpSchema), US.signup);
userRouter.post("/signin", validation(signInSchema), US.signin);
userRouter.get("/profile",authentication, US.getProfile);


userRouter.patch("/logOut",authentication , US.logOut);

userRouter.post("/refreshToken",validation(refreshTokenSchema) ,  US.refreshToken);
userRouter.get("/sharedProfile/:id",validation(sharedProfileSchema) ,US.sharedProfile);

userRouter.patch("/updateProfile", authentication, validation(updateProfileSchema), US.updateProfile);




export default userRouter;