export {
    apiFetch,
    APIFetchOptions,
    apiFetchJSON
} from './api-fetch.js'

export {
    sendEmail,
    sendGmail,
    getLogoImageAttachment,
    getTs,
    getTs36,
    SendMailProps,
    Address,
    EmailAddressProp,
} from './mailer.js';

export {
    mysql2Pool,
    mysql2Pool as pool,
    getConnection,
} from './mysql.js';

export {
    execQuery,
    query,
    QueryResult,
    QueryArgs,
    Field,
    query as SageODBCQuery,
} from './query.js';

export {
    default as sageOdbc,
    default as SageODBC,
    SageODBCResult
} from './sage-odbc.js';

export {
    resultToExcelSheet,
    buildXLSXHeaders,
    buildWorkBook,
    addResultToExcelSheet,
    parseDataForAOA,
    WorkBookSheets,
    ColumnNames,
    WorkSheet,
    decode_cell,
    encode_cell,
    aoa_to_sheet,
    json_to_sheet,
    sheet_add_json,
    sheet_add_aoa,
} from './toXLSX.js';

export {
    mysqlDate,
    getDBCompany,
    getSageCompany,
    ParseSQLParams,
    parseSQL,
    validateAccountParams,
    validateARDivisionNo,
    validateCustomerNo,
    isUserRole,
} from './utils.js';

export {
    validateUser,
    validateRole,
    loadValidation,
    roleName,
} from './validate-user.js';

export {
    validateUserAccount,
    validateUserAccount as validateAccount,
    validateUserCustomerAccess,
    ValidateUserAccountProps,
    ValidationResult,
    ValidateCustomerAccessResponse,
} from './validate-user-account.js'

export {
    ValidatedRequest,
    ValidatedResponse,
    ValidatedResponseLocals,
} from './types.js'

export {
    Debug
} from './debug.js'
