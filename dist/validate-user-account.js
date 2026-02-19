import { Debug } from './debug.js';
import { apiFetch } from './api-fetch.js';
const debug = Debug('chums:chums-base:validate-user-account');
export async function validateUserAccount({ id, ARDivisionNo, CustomerNo, ShipToCode, }) {
    try {
        const response = await validateUserCustomerAccess({ id, ARDivisionNo, CustomerNo, ShipToCode });
        return response.billTo || response.shipTo.includes(ShipToCode ?? '');
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
export async function validateUserCustomerAccess({ id, ARDivisionNo, CustomerNo, ShipToCode }) {
    try {
        const customerSlugParts = [ARDivisionNo, CustomerNo];
        if (ShipToCode) {
            customerSlugParts.push(ShipToCode);
        }
        const customerSlug = customerSlugParts.join('-');
        const url = '/api/user/v2/validate/user/:id/:customerKey.json'
            .replace(':id', encodeURIComponent(id)).replace(':customerKey', encodeURIComponent(customerSlug));
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
