import {Debug} from './debug.js';
import fetch, {RequestInit} from 'node-fetch';
import {URL} from 'node:url';

const debug = Debug('chums:chums-base:chums-api');

const CHUMS_API_USERNAME = process.env.CHUMS_API_USERNAME || '';
const CHUMS_API_PASSWORD = process.env.CHUMS_API_PASSWORD || '';
const CHUMS_API_HOST = process.env.CHUMS_API_HOST || 'http://localhost';
const LOCAL_HOSTNAMES = ['localhost', 'intranet.chums.com'];


export interface APIFetchOptions extends RequestInit {
    headers?: {
        Authorization?: string,
        'Content-Type'?: string
        referrer?: string,
    },
    method?: string,
    referrer?: string,
}

export async function apiFetch(url: string | URL, options: APIFetchOptions = {}) {
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("get()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }
}

export async function apiFetchJSON<T = unknown>(url: string | URL, options: APIFetchOptions = {}): Promise<T> {
    try {
        const res = await apiFetch(url, options);
        return await res.json() as T;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("apiFetchJSON()", err.message);
            return Promise.reject(err);
        }
        console.debug("apiFetchJSON()", err);
        return Promise.reject(new Error('Error in apiFetchJSON()'));
    }
}
