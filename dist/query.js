var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import Debug from 'debug';
import { spawn } from 'child_process';
const debug = Debug('chums:base:query');
const queryExecutable = process.env.SAGE_QUERY_EXECUTABLE || 'D:\\www\\SageQuery\\SageQuery.exe';
const namedPlaceholders = require('named-placeholders')();
const { format } = require('sqlstring');
function parseArgs({ dsn, company, offset = 0, limit = 100, sql }) {
    const args = [];
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
export function execQuery(props) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const args = parseArgs(props);
            const response = [];
            const child = spawn(queryExecutable, args);
            const errors = [];
            child.stderr.on('data', (buffer) => {
                const data = Buffer.from(buffer).toString();
                errors.push(data);
                debug('execQuery() stderr got data', data);
            });
            try {
                for (var _b = __asyncValues(child.stdout), _c; _c = yield _b.next(), !_c.done;) {
                    const data = _c.value;
                    response.push(Buffer.from(data).toString());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (errors.length) {
                return Promise.reject(new Error(errors.join(';')));
            }
            const json = response.join('');
            return JSON.parse(json);
        }
        catch (err) {
            if (err instanceof Error) {
                debug("execQuery() caught error: ", err.message);
            }
            return Promise.reject(err);
        }
    });
}
/**
 *
 * @param {string} company
 * @param {string} sql
 * @param {object} [params]
 * @return {Promise<*|{Company, Fields[], Error, Data[]}>}
 */
export function query(company, sql, params = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prepared = namedPlaceholders(sql, params || {});
            const parsedSQL = format(prepared[0], prepared[1]);
            return yield execQuery({ company, sql: parsedSQL });
        }
        catch (err) {
            if (err instanceof Error) {
                debug("query()", err.message);
            }
            return Promise.reject(err);
        }
    });
}
