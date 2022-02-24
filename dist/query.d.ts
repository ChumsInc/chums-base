export interface QueryArgs {
    dsn?: string;
    company?: string;
    offset?: number;
    limit?: number;
    sql: string;
}
export interface Field {
    Name: string;
    FieldType: string;
}
export interface QueryResult {
    Company: string;
    Fields: Field[];
    Error?: string | null;
    Data: Record<string, any>[];
    Query: string;
}
export declare function execQuery(props: QueryArgs): Promise<QueryResult>;
/**
 *
 * @param {string} company
 * @param {string} sql
 * @param {object} [params]
 * @return {Promise<*|{Company, Fields[], Error, Data[]}>}
 */
export declare function query(company: string, sql: string, params?: object): Promise<QueryResult>;
