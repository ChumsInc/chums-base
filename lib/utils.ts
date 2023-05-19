import {NextFunction, Request, Response} from "express";
// @ts-ignore
import NamedPlaceholders from 'named-placeholders';
import sqlString from 'sqlstring';
import {UserRole} from "chums-types";

const namedPlaceholders = NamedPlaceholders();
const {format} = sqlString;


export interface ParseSQLParams {
    [key: string]: any,
}

export function parseSQL(query: string, params: ParseSQLParams = {}): string {
    const prepared = namedPlaceholders(query, params || {});
    return format(prepared[0], prepared[1]);
}


/**
 * Returns a valid database company for use in database company fields
 * @param {String} company - Sage Company Code
 * @returns {String} chums|bc
 */
export function getDBCompany(company: string = ''): string {
    switch (String(company).toUpperCase()) {
        case 'CHI':
        case 'CHUMS':
            return 'chums';
        case 'BCS':
        case 'BC':
            return 'bc';
        default:
            return 'chums';
    }
}

/**
 * Returns a valid Sage Company code
 * @param {string} company
 * @returns {string} CHI|BCS|TST|BCT|SUH
 */
export function getSageCompany(company: string = 'chums'): string {
    switch (String(company).toLowerCase()) {
        case 'chums':
        case 'chi':
            return 'CHI';
        case 'bc':
        case 'bcs':
            return 'BCS';
        case 'tst':
            return 'TST';
        case 'bct':
            return 'BCT';
        case 'suh':
            return 'SUH';
        default:
            return 'CHI';
    }
}

export const mysqlDate = (d: string | number): string | null => {
    if (typeof d === 'string' && parseInt(d, 10).toString() === d) {
        d = parseInt(d, 10);
    }
    const date = new Date(d);
    if (isNaN(date.valueOf())) {
        return null;
    }
    return date.getFullYear()
        + '-' + String(date.getMonth() + 1).padStart(2, '0')
        + '-' + String(date.getDate()).padStart(2, '0');
};

export const validateARDivisionNo = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.ARDivisionNo !== undefined && !/^[0-9]{2}$/.test(req.params.ARDivisionNo)) {
        return res.status(404).end();
    }
    next();
};

export const validateCustomerNo = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.CustomerNo !== undefined && !/^[0-9A-Z]{3,20}$/.test(req.params.CustomerNo)) {
        return res.status(404).end();
    }
    next();
};

export const validateAccountParams = [validateARDivisionNo, validateCustomerNo];

export function isUserRole(role: string | UserRole): role is UserRole {
    return !(typeof role === 'string') && (role as UserRole).role !== undefined;
}
