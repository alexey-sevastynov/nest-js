import express from "express";
import cors from "cors";
import { ExpressAdapter } from "@nestjs/platform-express";
import type { INestApplication } from "@nestjs/common";
import { isServerlessMode } from "./common/utils/infra/environment";
import { getEnv } from "./common/utils/infra/env-functions";
import { envKeys } from "./common/enums/infra/env-key";
import { initializeApp } from "./initialize-app";
import { corsConfig } from "./config/cors-config";

type AppInstance = express.Express | INestApplication;

export async function bootstrap(): Promise<AppInstance> {
    if (isServerlessMode()) {
        const serverlessInstance = await createServerlessInstance();

        return serverlessInstance;
    }

    const serverInstance = await createServerInstance();

    return serverInstance;
}

async function createServerlessInstance() {
    const server = express();
    server.use(cors(corsConfig));

    const app = await initializeApp(new ExpressAdapter(server));
    await app.init();

    return server;
}

async function createServerInstance() {
    const app = await initializeApp();
    app.enableCors(corsConfig);

    const port = getEnv(envKeys.port) ?? 3000;

    await app.listen(port);

    return app;
}
