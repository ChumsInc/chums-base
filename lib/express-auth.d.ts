import { UserValidation } from "./types.js";
declare module "express-serve-static-core" {
    interface Request {
        userAuth: UserValidation;
    }
}
