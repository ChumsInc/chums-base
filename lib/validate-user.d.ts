import { NextFunction, Request, Response } from 'express';
import { UserRole, UserValidationResponse } from 'chums-types';
import { ValidatedRequest, ValidatedResponse } from "./types.js";
/**
 * Requests validation from CHUMS /api/user service
 * - On success populates res.locals.profile = {user, roles, accounts} and executes next()
 * - On success populates req.userAuth = {valid, status, profile} and executes next()
 * - On failure sends status 401 {error: 401, status: 'StatusText'}
 */
export declare function validateUser(req: ValidatedRequest, res: Response, next: NextFunction): Promise<void>;
/**
 * Executes validation request
 *  - validates JWT token from Authorization header "Bearer asdasd...asd" (from a standalone/web app)
 *  - validates req.cookies.PHPSESSID (from a logged-in user)
 *  - validates basic authentication (from an API user)
 */
export declare function loadValidation(req: Request): Promise<UserValidationResponse>;
export declare function roleName(role: string | UserRole): string;
/**
 * Validates a user role, stored in res.locals.profile.roles
 *  - On success executes next()
 *  - On failure sends status 403 Forbidden, {error: 403, status: 'Forbidden'}
 */
export declare const validateRole: (validRoles?: string | string[]) => (req: Request, res: ValidatedResponse, next: NextFunction) => void;
