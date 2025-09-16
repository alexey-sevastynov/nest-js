import type { Response, Request } from "express";
import { type CookieOptions } from "./cookie-types";
import { type CookieKey } from "./cookie-key";
import { isProd } from "../infra/environment";
import { timing } from "../../../common/constants/timing";

const cookieDefaultOptions: CookieOptions = {
    path: "/",
    maxAge: timing.oneDayInSeconds,
    httpOnly: true,
    secure: isProd(),
    sameSite: "lax",
};

export function setCookie(response: Response, key: CookieKey, value: string, options?: CookieOptions) {
    const opts = { ...cookieDefaultOptions, ...options };

    response.cookie(key, value, opts);
}

export function removeCookie(response: Response, key: CookieKey, options?: CookieOptions) {
    const opts = { ...cookieDefaultOptions, ...options, maxAge: 0 };

    response.cookie(key, "", opts);
}

export function getCookie(request: Request, key: CookieKey) {
    const cookies = request.cookies as Record<string, string> | undefined;

    return cookies?.[key] ?? null;
}
