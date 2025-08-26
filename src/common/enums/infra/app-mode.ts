export const appModes = {
    standalone: "standalone",
    serverless: "serverless",
} as const;

export type AppMode = (typeof appModes)[keyof typeof appModes];
