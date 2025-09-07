export const envKeys = {
    mongoUser: "MONGO_USER",
    mongoPassword: "MONGO_PASSWORD",
    mongoCluster: "MONGO_CLUSTER",
    mongoDb: "MONGO_DB",
    appMode: "APP_MODE",
    port: "PORT",
    nodeEnv: "NODE_ENV",
    jwtSecret: "JWT_SECRET",
    jwtExpiration: "JWT_EXPIRATION",
} as const;

export type EnvKey = (typeof envKeys)[keyof typeof envKeys];
