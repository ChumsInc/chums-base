import Debug from 'debug';
import {NextFunction, Request, Response} from 'express'
import {default as fetch, Headers, RequestInit} from 'node-fetch';
import {UserRole, UserValidationResponse} from 'chums-types'
import {basicAuth, jwtToken} from './auth.js';
import {ValidatedRequest, ValidatedResponse} from "./types.js";
import {isBeforeExpiry, isLocalToken, validateToken} from './jwt-handler.js';
import {isUserRole} from "./utils.js";

const debug = Debug('chums:base:validate-user');
const API_HOST = process.env.CHUMS_API_HOST || 'http://localhost';


/**
 * Requests validation from CHUMS /api/user service
 * - On success populates res.locals.profile = {user, roles, accounts} and executes next()
 * - On success populates req.userAuth = {valid, status, profile} and executes next()
 * - On failure sends status 401 {error: 401, status: 'StatusText'}
 */
export async function validateUser(req: ValidatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const {valid, status, profile} = await loadValidation(req);
        if (!valid) {
            res.status(401).json({error: 401, status});
            return;
        }
        res.locals.profile = profile;
        req.userAuth = {valid, status, profile};
        next();
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("validateUser()", err.message)
            res.status(401).json({error: 'Not authorized', message: err.message});
            return;
        }
        debug("validateUser()", err)
        res.status(401).json({error: 'Not authorized', message: err});
    }
}


/**
 * Executes validation request
 *  - validates JWT token from Authorization header "Bearer asdasd...asd" (from a standalone/web app)
 *  - validates req.cookies.PHPSESSID (from a logged-in user)
 *  - validates basic authentication (from an API user)
 */
export async function loadValidation(req: Request): Promise<UserValidationResponse> {
    try {
        const {token} = jwtToken(req);
        if (token) {
            const decoded = await validateToken(token);
            if (isLocalToken(decoded) && isBeforeExpiry(decoded)) {
                const {user, roles = [], accounts = []} = decoded;
                return {
                    valid: true,
                    status: 'OK',
                    profile: {
                        user,
                        accounts,
                        roles
                    }
                }
            }
        }

        const {user, pass} = basicAuth(req);
        const session = req.cookies.PHPSESSID;

        const fetchOptions: RequestInit = {};
        const headers = new Headers();
        headers.set('X-Forwarded-For', req.ip);
        headers.set('referrer', req.get('referrer') || req.originalUrl);

        let url = `${API_HOST}/api/user/validate`;

        if (!!user && !!pass) {
            const credentials = Buffer.from(`${user}:${pass}`).toString('base64');
            headers.set('Authorization', `Basic ${credentials}`);
        } else if (!!token) {
            url += '/google';
            fetchOptions.method = 'post';
            fetchOptions.body = JSON.stringify({token});
            headers.set('Content-Type', 'application/json');
        } else if (!!session) {
            url += `/${encodeURIComponent(session)}`;
        }

        fetchOptions.headers = headers;
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            return Promise.reject(new Error(`${response.status} ${response.statusText}`));
        }
        return await response.json() as UserValidationResponse;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("loadValidation()", err.message);
            return Promise.reject(err);
        }
        debug("loadValidation()", err);
        return Promise.reject(err);
    }
}

export function roleName(role: string | UserRole): string {
    if (isUserRole(role)) {
        return role.role;
    }
    return role;
}

/**
 * Validates a user role, stored in res.locals.profile.roles
 *  - On success executes next()
 *  - On failure sends status 403 Forbidden, {error: 403, status: 'Forbidden'}
 */
export const validateRole = (validRoles: string | string[] = []) =>
    (req: Request, res: ValidatedResponse, next: NextFunction) => {
        if (res.locals.profile && res.locals.profile.roles) {
            const {roles = []} = res.locals.profile;
            if (!Array.isArray(validRoles)) {
                validRoles = [validRoles];
            }
            const valid = ['root', ...validRoles];
            const isValid = roles.map(role => valid.includes(roleName(role))).length > 0;
            if (isValid) {
                return next();
            }
        }
        debug('validateRole() Not Authorized', res.locals?.profile?.user?.id, validRoles);
        res.status(403).json({error: 403, status: 'Forbidden'});
    }

