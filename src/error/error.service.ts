import { CommonError } from "./common-errors";

export const toCommonErrorMessage = (error?: CommonError): string | undefined => {
    if(!error) {
        return;
    }
    switch (error) {
        case CommonError.UNAUTHENTICATED:
        case CommonError.PERMISSION_DENIED:
            return 'You don\'t have the rights to perform this operation.';
        case CommonError.CONNECTIVITY_ISSUE:
            return 'It looks like the connection was lost during the operation. Please try again.';
        case CommonError.DATA_LOSS:
            return 'The data you are reaching have been damaged or lost. You will need to re-create it.';
        case CommonError.ALREADY_EXISTS:
            return 'This item already exists. You cannot recreate it.';
        case CommonError.NOT_FOUND:
            return 'Hum, we couldn\'t find what you are looking for.';
        case CommonError.SYSTEM_INTERNAL:
        case CommonError.OTHER:
        default:
            return 'Hum, something went wrong, try again!';
    }

}