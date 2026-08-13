export interface KavappLoginResponse {
    error: string | null;
    message: string | null;
    data: KavappLoginData;
}

interface KavappLoginData {
    token: string;
    name: string;
    version: string;
    tariff: string;
}
