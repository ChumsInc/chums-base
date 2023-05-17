import NamedPlaceholders from 'named-placeholders';
import sqlString from 'sqlstring';
const namedPlaceholders = NamedPlaceholders();
const { format } = sqlString;
export function parseSQL(query, params = {}) {
    const prepared = namedPlaceholders(query, params || {});
    return format(prepared[0], prepared[1]);
}
/**
 * Returns a valid database company for use in database company fields
 * @param {String} company - Sage Company Code
 * @returns {String} chums|bc
 */
export function getDBCompany(company = '') {
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
export function getSageCompany(company = 'chums') {
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
export const mysqlDate = (d) => {
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
export const validateARDivisionNo = (req, res, next) => {
    if (req.params.ARDivisionNo !== undefined && !/^[0-9]{2}$/.test(req.params.ARDivisionNo)) {
        return res.status(404).end();
    }
    next();
};
export const validateCustomerNo = (req, res, next) => {
    if (req.params.CustomerNo !== undefined && !/^[0-9A-Z]{3,20}$/.test(req.params.CustomerNo)) {
        return res.status(404).end();
    }
    next();
};
export const validateAccountParams = [validateARDivisionNo, validateCustomerNo];
