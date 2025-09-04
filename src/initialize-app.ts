import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import type { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { isDev } from "./common/utils/infra/environment";
import { initializeSwagger } from "./swagger/setup";

export async function initializeApp(adapter?: ExpressAdapter) {
    const app = await initNestAppWithAdapter(adapter);

    app.useGlobalPipes(new ValidationPipe());

    if (isDev()) initializeSwagger(app);

    return app;
}

async function initNestAppWithAdapter(adapter?: ExpressAdapter) {
    if (adapter) {
        return NestFactory.create(AppModule, adapter);
    }

    return NestFactory.create(AppModule);
}
