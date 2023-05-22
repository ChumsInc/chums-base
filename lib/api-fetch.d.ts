/// <reference types="node" />
import { RequestInit } from 'node-fetch';
import { URL } from 'node:url';
export interface APIFetchOptions extends RequestInit {
    headers?: {
        Authorization?: string;
        'Content-Type'?: string;
        referrer?: string;
    };
    method?: string;
    referrer?: string;
}
export declare function apiFetch(url: string | URL, options?: APIFetchOptions): Promise<import("node-fetch").Response>;
export declare function apiFetchJSON<T = unknown>(url: string | URL, options?: APIFetchOptions): Promise<T>;
