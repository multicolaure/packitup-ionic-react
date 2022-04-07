
export enum CommonError {
    UNAUTHENTICATED = "UNAUTHENTICATED",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    NOT_FOUND = "NOT_FOUND",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    DATA_LOSS = "DATA_LOSS",
    CONNECTIVITY_ISSUE = "CONNECTIVITY_ISSUE",
    CANCELLED_BY_USER = "CANCELLED_BY_USER",
    SYSTEM_INTERNAL = "SYSTEM_INTERNAL",
    OTHER = "OTHER",
}

export function getCommonErrorFromMessage(message: string | undefined) {
    return CommonError[message as keyof typeof CommonError] ?? CommonError.OTHER;
}