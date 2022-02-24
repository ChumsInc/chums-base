import {UserValidation} from "./types";

declare module "express-serve-static-core" {
    export interface Request {
        userAuth: UserValidation
    }
}
