var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Debug from 'debug';
import { apiFetch } from './api-fetch';
import { getDBCompany } from './utils';
const debug = Debug('chums:local-modules:validate-user-account');
const VALIDATE_URL = '/api/user/:id/validate/account/:Company/:ARDivisionNo-:CustomerNo';
export function validateUserAccount({ id, Company, ARDivisionNo, CustomerNo }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = VALIDATE_URL
                .replace(':id', encodeURIComponent(id))
                .replace(':Company', encodeURIComponent(getDBCompany(Company)))
                .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
                .replace(':CustomerNo', encodeURIComponent(CustomerNo));
            const res = yield apiFetch(url, { referrer: 'chums:local-modules:validate-user' });
            if (!res.ok) {
                debug('validateAccount()', res.status, res.statusText);
                return Promise.reject(new Error(`Error ${res.status}: ${res.statusText}`));
            }
            const { success } = yield res.json();
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
    });
}
