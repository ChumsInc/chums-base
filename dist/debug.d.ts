import { LoggerOptions } from 'winston';
import 'winston-daily-rotate-file';
export declare function Debug(prefix: string, options?: LoggerOptions): (...args: unknown[]) => void;
