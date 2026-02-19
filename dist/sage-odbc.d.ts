/**
 * Created by steve on 12/16/2016.
 */
import { open } from 'node-adodb';
export interface SageODBCResult<T> {
    sql: string;
    records: T;
}
declare class SageODBC {
    connection: null | open;
    constructor(company: string);
    connect(company: string): void;
    static getConnection(company?: string): Promise<SageODBC>;
    static sql(query: string, params?: object): string;
    query<T>(query: string, params?: object): Promise<SageODBCResult<T>>;
    schema<T>(type: number, criteria?: unknown[] | undefined, id?: string | undefined): Promise<T | null>;
    static escape(str: string): string;
}
export default SageODBC;
