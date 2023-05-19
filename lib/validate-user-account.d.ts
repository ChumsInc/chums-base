import { CustomerValidationResponse } from "chums-types";
/**
 *
 * @param {string|number} id - User ID
 * @param {string} Company
 * @param {string} ARDivisionNo
 * @param {string} CustomerNo
 * @returns {Promise<boolean>}
 */
export interface ValidateUserAccountProps {
    id: string | number;
    Company: string;
    ARDivisionNo: string;
    CustomerNo: string;
}
export interface ValidationResult {
    success?: boolean;
}
export declare function validateUserAccount({ id, Company, ARDivisionNo, CustomerNo }: ValidateUserAccountProps): Promise<boolean>;
export declare function validateUserCustomerAccess({ id, Company, ARDivisionNo, CustomerNo }: ValidateUserAccountProps): Promise<CustomerValidationResponse>;
