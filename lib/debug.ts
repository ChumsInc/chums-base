import winston, {LoggerOptions} from 'winston';
import 'winston-daily-rotate-file';
import {TransformableInfo} from "logform";
import util from 'node:util'
import path from 'node:path';

const logTemplate = (info:TransformableInfo) => {
    const {level, label, timestamp, message} = info;
    return `${timestamp} ${level} ${label} ${message}`;
}
interface LoggerInstance {
    instance: winston.Logger|null;
}
const logger:LoggerInstance = {
    instance: null,
}

export default function DebugLogger(prefix: string, options?:LoggerOptions) {
    if (!logger.instance) {
        initLogger(options);
    }
    return (...args:any[]) => {
        if (logger.instance) {
            logger.instance.log({level: 'info', label: prefix, message: util.format(...args)});
        }
    }
}

function initLogger(options?:LoggerOptions) {
    if (!options) {
        options = {};
    }
    const logFormat = winston.format.printf(logTemplate);
    if (!process.env.DEBUG_LOG_PATH) {
        return Promise.reject('Invalid env DEBUG_LOG_PATH');
    }
    logger.instance = winston.createLogger({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), logFormat),
        transports: [
            new winston.transports.DailyRotateFile({
                maxSize: '1m',
                maxFiles: '180d',
                filename: path.resolve(path.join(process.cwd(), process.env.DEBUG_LOG_PATH, 'debug-%DATE%.log')),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
            }),
            new winston.transports.File({
                filename: path.resolve(path.join(process.cwd(), process.env.DEBUG_LOG_PATH, 'debug.log')),
                level: 'error',
                format: winston.format.json()
            }),
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }),
        ],
        ...options,
    })
}
