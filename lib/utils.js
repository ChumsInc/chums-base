import NamedPlaceholders from 'named-placeholders';
import sqlString from 'sqlstring';
const namedPlaceholders = NamedPlaceholders();
const { format } = sqlString;
export function parseSQL(query, params = {}) {
    const prepared = namedPlaceholders(query, params || {});
    return format(prepared[0], prepared[1]);
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
