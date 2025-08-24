import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { initializeSwagger } from "./swagger/setup";
import { isDev } from "./common/utils/infra/environment";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    if (isDev()) initializeSwagger(app);

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
