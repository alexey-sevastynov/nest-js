export const cookieKeys = {
    isVerified: "isVerified",
} as const;

export type CookieKey = (typeof cookieKeys)[keyof typeof cookieKeys];
