import Debug from 'debug';
import {spawn} from 'child_process';

const debug = Debug('chums:base:query');
const queryExecutable = process.env.SAGE_QUERY_EXECUTABLE || 'D:\\www\\SageQuery\\SageQuery.exe';
const namedPlaceholders = require('named-placeholders')();
const {format} = require('sqlstring');


export interface QueryArgs {
    dsn?: string,
    company?: string,
    offset?: number,
    limit?: number,
    sql: string,
}

export interface Field {
    Name: string,
    FieldType: string,
}

export interface QueryResult {
    Company: string,
    Fields: Field[],
    Error?: string | null,
    Data: Record<string, any>[],
    Query: string,
}

function parseArgs({dsn, company, offset = 0, limit = 100, sql}: QueryArgs): string[] {
    const args: string[] = [];
    if (dsn) {
        args.push(...['--dsn', String(dsn).trim()]);
    }
    if (company) {
        args.push(...['--company', String(company).trim()]);
    }
    if (offset && Number(offset) > 0) {
        args.push(...['--offset', String(offset).trim()]);
    }
    if (limit && Number(limit) > 0) {
        args.push(...['--limit', String(limit).trim()]);
    }
    args.push(sql.trim());
    return args;
}


export async function execQuery(props: QueryArgs): Promise<QueryResult> {
    try {
        const args = parseArgs(props);
        const response: string[] = [];
        const child = spawn(queryExecutable, args);
        const errors: string[] = [];

        child.stderr.on('data', (buffer) => {
            const data = Buffer.from(buffer).toString();
            errors.push(data);
            debug('execQuery() stderr got data', data);
        });

        for await (const data of child.stdout) {
            response.push(Buffer.from(data).toString())
        }

        if (errors.length) {
            return Promise.reject(new Error(errors.join(';')));
        }

        const json = response.join('');
        return JSON.parse(json) as QueryResult;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("execQuery() caught error: ", err.message);
        }
        return Promise.reject(err);
    }
}


/**
 *
 * @param {string} company
 * @param {string} sql
 * @param {object} [params]
 * @return {Promise<*|{Company, Fields[], Error, Data[]}>}
 */
export async function query(company: string, sql: string, params: object = {}): Promise<QueryResult> {
    try {
        const prepared = namedPlaceholders(sql, params || {});
        const parsedSQL = format(prepared[0], prepared[1]);
        return await execQuery({company, sql: parsedSQL})
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("query()", err.message);
        }
        return Promise.reject(err);
    }
}

