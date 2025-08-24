import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle("My Project API")
    .setDescription("API documentation for all services")
    .setVersion("1.0")
    .build();
