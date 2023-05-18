import Debug from 'debug';
import fetch from 'node-fetch';
import { URL } from 'url';
const debug = Debug('chums:local_modules:chums-api');
const CHUMS_API_USERNAME = process.env.CHUMS_API_USERNAME || '';
const CHUMS_API_PASSWORD = process.env.CHUMS_API_PASSWORD || '';
const CHUMS_API_HOST = process.env.CHUMS_API_HOST || 'http://localhost';
const LOCAL_HOSTNAMES = ['localhost', 'intranet.chums.com'];
export async function apiFetch(url = '', options = {}) {
    try {
        if (typeof url === 'string') {
            url = new URL(url, CHUMS_API_HOST);
        }
        if (!options.headers) {
            options.headers = {};
        }
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/json';
        }
        options.headers.referrer = `${process.env.COMPUTERNAME || 'chums-base'}/`;
        if (options.referrer) {
            options.headers.referrer += options.referrer;
            delete options.referrer;
        }
        if (!options.headers.Authorization && LOCAL_HOSTNAMES.includes(url.hostname)) {
            if (!CHUMS_API_USERNAME || !CHUMS_API_PASSWORD) {
                debug('apiFetch() WARNING: session variables CHUMS_API_USERNAME, CHUMS_API_PASSWORD not set.');
            }
            const auth = Buffer.from(`${CHUMS_API_USERNAME}:${CHUMS_API_PASSWORD}`).toString('base64');
            options.headers.Authorization = `Basic ${auth}`;
        }
        return await fetch(url.toString(), options);
    }
    catch (err) {
        if (err instanceof Error) {
            debug("get()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }
}
