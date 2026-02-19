export interface ValidateUserAccountProps {
    id: string | number;
    ARDivisionNo: string;
    CustomerNo: string;
    ShipToCode?: string | null;
}
export interface ValidateCustomerAccessResponse {
    billTo: boolean;
    shipTo: string[];
    canSetDefaultShipTo: boolean;
}
export interface ValidationResult {
    success?: boolean;
}
export declare function validateUserAccount({ id, ARDivisionNo, CustomerNo, ShipToCode, }: ValidateUserAccountProps): Promise<boolean>;
export declare function validateUserCustomerAccess({ id, ARDivisionNo, CustomerNo, ShipToCode }: ValidateUserAccountProps): Promise<ValidateCustomerAccessResponse>;
