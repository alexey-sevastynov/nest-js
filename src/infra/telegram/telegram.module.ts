import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TelegramService } from "./telegram.service";
import { TelegramInterceptor } from "./telegram.interceptor";
import { TelegramMessageMapping, TelegramMessageMappingSchema } from "./telegram-message-mapping.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TelegramMessageMapping.name, schema: TelegramMessageMappingSchema },
        ]),
    ],
    providers: [
        TelegramService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TelegramInterceptor,
        },
    ],
    exports: [TelegramService],
})
export class TelegramModule {}
