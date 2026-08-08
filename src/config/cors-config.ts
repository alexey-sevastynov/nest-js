import type { Request, Response, NextFunction } from "express";
import { type CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { httpHeaders } from "../common/constants/network/http-headers";
import { methods } from "../common/constants/network/methods";
import { origins } from "../common/constants/network/origins";

const corsAllowedOrigins = [origins.localHost(), origins.localHost(3228), origins.vercel];
const corsMethods = [
    methods.get,
    methods.post,
    methods.put,
    methods.patch,
    methods.delete,
    methods.options,
    methods.head,
];
const corsAllowedHeaders = [httpHeaders.contentType, httpHeaders.authorization];

export const corsConfig: CorsOptions = {
    origin: corsAllowedOrigins,
    credentials: true,
    methods: corsMethods,
    allowedHeaders: corsAllowedHeaders,
};

export function serverlessCors(request: Request, response: Response, next: NextFunction) {
    const origin = request.headers.origin;

    if (origin && isCorsOriginAllowed(origin)) {
        response.setHeader(httpHeaders.accessControlAllowOrigin, origin);
        response.setHeader(httpHeaders.accessControlAllowMethods, corsMethods.join(","));
        response.setHeader(httpHeaders.accessControlAllowHeaders, corsAllowedHeaders.join(","));
        response.setHeader(httpHeaders.accessControlAllowCredentials, "true");
    }

    if (isPreflightRequest(request.method)) {
        response.status(204).end();

        return;
    }

    next();
}

function isCorsOriginAllowed(origin: string) {
    try {
        const url = new URL(origin);

        return corsAllowedOrigins.includes(origin) || url.hostname.endsWith(".vercel.app");
    } catch {
        return false;
    }
}

function isPreflightRequest(method: string) {
    return method === methods.options;
}
