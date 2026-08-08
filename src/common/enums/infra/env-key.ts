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
    resendApiKey: "RESEND_API_KEY",
    resendFromEmail: "RESEND_FROM_EMAIL",
    frontendBaseUrl: "FRONTEND_BASE_URL",
    nodeMailerUser: "NODEMAILER_USER",
    nodeMailerPassword: "NODEMAILER_PASSWORD",
    mailProvider: "MAIL_PROVIDER",
    telegramBotToken: "TELEGRAM_BOT_TOKEN",
    telegramChatId: "TELEGRAM_CHAT_ID",
} as const;

export type EnvKey = (typeof envKeys)[keyof typeof envKeys];
