export interface QueryArgs {
    dsn?: string;
    company?: string;
    offset?: number;
    limit?: number;
    sql: string;
}
export interface Field<T = any> {
    Name: keyof T | string;
    FieldType: string;
}
export interface QueryResult<T = any> {
    Company: string;
    Fields: Field<T>[];
    Error?: string | null;
    Data: Record<string, T>[];
    Query: string;
}
export declare function execQuery<T = any>(props: QueryArgs): Promise<QueryResult<T>>;
/**
 *
 * @param {string} company
 * @param {string} sql
 * @param {object} [params]
 * @return {Promise<*|{Company, Fields[], Error, Data[]}>}
 */
export declare function query<T = any>(company: string, sql: string, params?: object): Promise<QueryResult>;
