import {Locals, Request, Response} from "express";
import {UserValidationResponse, ValidatedUserProfile} from "chums-types";


export interface ValidatedRequest {
    userAuth?: UserValidationResponse;

}

export interface ValidatedResponseLocals extends Locals {
    profile?: ValidatedUserProfile;
}

export interface ValidatedResponse {
    locals: ValidatedResponseLocals;
}
