import { CustomerValidationResponse } from "chums-types";
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
