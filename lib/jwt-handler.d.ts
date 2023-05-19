import { JwtPayload } from 'jsonwebtoken';
import { BaseJWTToken, UserJWTToken } from "chums-types";
/**
 * Validates a JTW Token
 * @param {String} token - A JWT token to be validated
 * @return {Promise<BaseJWTToken|Error>}
 */
export declare const validateToken: (token: string) => Promise<BaseJWTToken | UserJWTToken>;
/**
 * Validates a token expiration timestamp
 */
export declare const isBeforeExpiry: (payload: BaseJWTToken | JwtPayload | null | string) => boolean;
/**
 * Checks to see if a token is locally issued
 */
export declare const isLocalToken: (payload: UserJWTToken | BaseJWTToken | JwtPayload | null | string) => payload is UserJWTToken;
