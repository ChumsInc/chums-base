import { NextFunction, Request, Response } from "express";
export interface ParseSQLParams {
    [key: string]: any;
}
export declare function parseSQL(query: string, params?: ParseSQLParams): string;
export declare const mysqlDate: (d: string | number) => string | null;
export declare const validateARDivisionNo: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateCustomerNo: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateAccountParams: ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined)[];
