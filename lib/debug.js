import winston from 'winston';
import 'winston-daily-rotate-file';
import util from 'node:util';
import path from 'node:path';
const logTemplate = (info) => {
    const { level, label, timestamp, message } = info;
    return `${timestamp} ${level} ${label} ${message}`;
};
const logger = {
    instance: null,
};
export default function DebugLogger(prefix, options) {
    if (!logger.instance) {
        initLogger(options);
    }
    return (...args) => {
        if (logger.instance) {
            logger.instance.log({ level: 'info', label: prefix, message: util.format(...args) });
        }
    };
}
function initLogger(options) {
    if (!options) {
        options = {};
    }
    const logFormat = winston.format.printf(logTemplate);
    const logPath = process.env.DEBUG_LOG_PATH ?? 'logs';
    logger.instance = winston.createLogger({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), logFormat),
        transports: [
            new winston.transports.DailyRotateFile({
                maxSize: '1m',
                maxFiles: '180d',
                filename: path.resolve(path.join(process.cwd(), logPath, 'debug-%DATE%.log')),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
            }),
            new winston.transports.File({
                filename: path.resolve(path.join(process.cwd(), logPath, 'debug.log')),
                level: 'error',
                format: winston.format.json()
            }),
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(winston.format.colorize(), winston.format.simple())
            }),
        ],
        ...options,
    });
}
