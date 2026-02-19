import { NextFunction, Request, Response } from "express";
import { UserRole } from "chums-types";
export interface ParseSQLParams {
    [key: string]: unknown;
}
export declare function parseSQL(query: string, params?: ParseSQLParams): string;
/**
 * Returns a valid database company for use in database company fields
 * @param {String} company - Sage Company Code
 * @returns {String} chums|bc
 */
export declare function getDBCompany(company?: string): string;
/**
 * Returns a valid Sage Company code
 * @param {string} company
 * @returns {string} CHI|BCS|TST|BCT|SUH
 */
export declare function getSageCompany(company?: string): string;
export declare const mysqlDate: (d: string | number) => string | null;
export declare const validateARDivisionNo: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateCustomerNo: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateAccountParams: ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined)[];
export declare function isUserRole(role: string | UserRole): role is UserRole;
