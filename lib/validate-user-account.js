import { Debug } from './debug.js';
;
import { apiFetch } from './api-fetch.js';
import { getDBCompany } from './utils.js';
const debug = Debug('chums:chums-base:validate-user-account');
const VALIDATE_URL = '/api/user/:id/validate/account/:Company/:ARDivisionNo-:CustomerNo';
export async function validateUserAccount({ id, Company, ARDivisionNo, CustomerNo }) {
    try {
        const url = VALIDATE_URL
            .replace(':id', encodeURIComponent(id))
            .replace(':Company', encodeURIComponent(getDBCompany(Company)))
            .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
            .replace(':CustomerNo', encodeURIComponent(CustomerNo));
        const res = await apiFetch(url, { referrer: 'chums:chums-base:validate-user' });
        if (!res.ok) {
            debug('validateAccount()', res.status, res.statusText);
            return Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`));
        }
        const { success } = await res.json();
        return success === true;
    }
    catch (err) {
        if (err instanceof Error) {
            debug("validateAccount()", err.message);
            return Promise.reject(err);
        }
        debug("validateAccount()", err);
        return Promise.reject(err);
    }
}
export async function validateUserCustomerAccess({ id, Company, ARDivisionNo, CustomerNo }) {
    try {
        const url = '/api/user/:id/validate/customer/:Company/:ARDivisionNo-:CustomerNo'
            .replace(':id', encodeURIComponent(id))
            .replace(':Company', encodeURIComponent(getDBCompany(Company)))
            .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
            .replace(':CustomerNo', encodeURIComponent(CustomerNo));
        const res = await apiFetch(url, { referrer: 'chums:chums-base:validate-user:validateUserCustomerAccess' });
        if (!res.ok) {
            debug('validateAccount()', res.status, res.statusText);
            return Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`));
        }
        return await res.json();
    }
    catch (err) {
        if (err instanceof Error) {
            console.debug("validateUserCustomerAccess()", err.message);
            return Promise.reject(err);
        }
        console.debug("validateUserCustomerAccess()", err);
        return Promise.reject(new Error('Error in validateUserCustomerAccess()'));
    }
}
