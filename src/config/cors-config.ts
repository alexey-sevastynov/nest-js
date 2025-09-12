import type { Request, Response, NextFunction } from "express";
import { type CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { headers } from "../common/constants/network/headers";
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
const corsAllowedHeaders = [headers.contentType, headers.authorization];

export const corsConfig: CorsOptions = {
    origin: corsAllowedOrigins,
    credentials: true,
    methods: corsMethods,
    allowedHeaders: corsAllowedHeaders,
};

export function serverlessCors(request: Request, response: Response, next: NextFunction) {
    const origin = request.headers.origin;

    if (origin && isCorsOriginAllowed(origin)) {
        response.setHeader(headers.accessControlAllowOrigin, origin);
        response.setHeader(headers.accessControlAllowMethods, corsMethods.join(","));
        response.setHeader(headers.accessControlAllowHeaders, corsAllowedHeaders.join(","));
        response.setHeader(headers.accessControlAllowCredentials, "true");
    }

    if (isPreflightRequest(request.method)) {
        response.status(204).end();

        return;
    }

    next();
}

function isCorsOriginAllowed(origin: string) {
    return corsAllowedOrigins.includes(origin);
}

function isPreflightRequest(method: string) {
    return method === methods.options;
}
