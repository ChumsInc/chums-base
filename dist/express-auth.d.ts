import { UserValidation } from "./types";
declare module "express-serve-static-core" {
    interface Request {
        userAuth: UserValidation;
    }
}
