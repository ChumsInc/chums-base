/**
 * Created by steve on 12/16/2016.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Debug from 'debug';
const adodb = require('node-adodb');
const { escape, format } = require('sqlstring');
import { getSageCompany } from './utils.js';
const namedPlaceholders = require('named-placeholders')();
const debug = Debug('chums:local_modules:chums-base:sage-odbc');
const connectionString = (company = 'CHI') => {
    company = getSageCompany(company);
    return `DSN=SAGE; Company=${company};`;
};
class SageODBC {
    constructor(company) {
        // static adSchemaTables = 20;
        // static adSchemaColumns = 4;
        this.connection = null;
        this.connection = null;
        if (company) {
            this.connect(company);
        }
    }
    connect(company) {
        this.connection = adodb.open(connectionString(company));
    }
    static getConnection(company = 'CHI') {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    static sql(query, params = {}) {
        const prepared = namedPlaceholders(query, params || {});
        return format(prepared[0], prepared[1]);
    }
    query(query, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                return Promise.reject(new Error('SageODBC not connected.'));
            }
            const sql = SageODBC.sql(query, params);
            try {
                const records = yield this.connection.query(sql);
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
        });
    }
    schema(type, criteria, id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.schema(type, criteria, id)) || null;
        });
    }
    static escape(str) {
        return escape(str);
    }
}
export default SageODBC;
