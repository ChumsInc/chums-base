/// <reference types="node" />
import { URL } from 'url';
export interface APIFetchOptions {
    headers?: {
        Authorization?: string;
        'Content-Type'?: string;
        referrer?: string;
    };
    method?: string;
    referrer?: string;
}
export declare function apiFetch(url?: string | URL, options?: APIFetchOptions): Promise<import("node-fetch").Response>;
