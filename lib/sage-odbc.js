/**
 * Created by steve on 12/16/2016.
 */
import Debug from 'debug';
import adodb from 'node-adodb';
import sqlString from 'sqlstring';
import { getSageCompany } from './utils.js';
// @ts-ignore
import NamedPlaceholders from 'named-placeholders';
const { escape, format } = sqlString;
const namedPlaceholders = NamedPlaceholders();
const debug = Debug('chums:local_modules:chums-base:sage-odbc');
const connectionString = (company = 'CHI') => {
    company = getSageCompany(company);
    return `DSN=SAGE; Company=${company};`;
};
class SageODBC {
    // static adSchemaTables = 20;
    // static adSchemaColumns = 4;
    connection = null;
    constructor(company) {
        this.connection = null;
        if (company) {
            this.connect(company);
        }
    }
    connect(company) {
        this.connection = adodb.open(connectionString(company));
    }
    static async getConnection(company = 'CHI') {
        try {
            const instance = new SageODBC(company);
            instance.connect(company);
            return instance;
        }
        catch (err) {
            if (err instanceof Error) {
                debug("getConnection()", err.message);
            }
            return Promise.reject(err);
        }
    }
    static sql(query, params = {}) {
        const prepared = namedPlaceholders(query, params || {});
        return format(prepared[0], prepared[1]);
    }
    async query(query, params = {}) {
        if (!this.connection) {
            return Promise.reject(new Error('SageODBC not connected.'));
        }
        const sql = SageODBC.sql(query, params);
        try {
            const records = await this.connection.query(sql);
            return {
                sql,
                records,
            };
        }
        catch (err) {
            if (err instanceof Error) {
                debug("query()", err.message, sql);
            }
            return Promise.reject(err);
        }
    }
    async schema(type, criteria, id) {
        return this.connection?.schema(type, criteria, id) || null;
    }
    static escape(str) {
        return escape(str);
    }
}
export default SageODBC;
