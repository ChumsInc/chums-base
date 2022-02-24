/**
 * Created by steve on 12/16/2016.
 */

import Debug from 'debug';
import {open} from 'node-adodb';
const adodb = require('node-adodb');
const {escape, format} = require('sqlstring');
import {getSageCompany} from './utils.js';

export interface QueryResult<T> {
    sql: string,
    records: T
}

const namedPlaceholders = require('named-placeholders')();
const debug = Debug('chums:local_modules:chums-base:sage-odbc');


const connectionString = (company: string = 'CHI'): string => {
    company = getSageCompany(company);
    return `DSN=SAGE; Company=${company};`;
};


class SageODBC {
    // static adSchemaTables = 20;
    // static adSchemaColumns = 4;
    connection: null | open = null;

    constructor(company: string) {
        this.connection = null;
        if (company) {
            this.connect(company);
        }
    }

    connect(company: string) {
        this.connection = adodb.open(connectionString(company));
    }

    static async getConnection(company: string = 'CHI') {
        try {
            const instance = new SageODBC(company);
            instance.connect(company);
            return instance;
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("getConnection()", err.message);
            }
            return Promise.reject(err);
        }
    }

    static sql(query: string, params: object = {}): string {
        const prepared = namedPlaceholders(query, params || {});
        return format(prepared[0], prepared[1]);
    }

    async query<T>(query: string, params: object = {}): Promise<QueryResult<T>> {
        if (!this.connection) {
            return Promise.reject(new Error('SageODBC not connected.'));
        }
        const sql = SageODBC.sql(query, params);
        try {
            const records = await this.connection.query<T>(sql);
            return {
                sql,
                records,
            };
        } catch (err: unknown) {
            if (err instanceof Error) {
                debug("query()", err.message, sql);
            }
            return Promise.reject(err);
        }
    }

    async schema<T>(type: number, criteria?: any[] | undefined, id?: string | undefined): Promise<T | null> {
        return this.connection?.schema<T>(type, criteria, id) || null;
    }

    static escape(str: string): string {
        return escape(str);
    }
}

export default SageODBC;
