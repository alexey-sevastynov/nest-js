import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./config";

export function initializeSwagger(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup("api", app, document);
}
