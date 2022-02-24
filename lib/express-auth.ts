import {UserValidation} from "./types.js";

declare module "express-serve-static-core" {
    export interface Request {
        userAuth: UserValidation
    }
}
