export interface LogFilter {
    applicationId: string;
    messageTypes: string;
    messageContains: string;
    hostContains: string;
    errorJsonContains: string;
    userContains: string;
    page: number;
    pageSize: number;
    environment: string;
}
