import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getMongoUri } from "./mongo-connection";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: getMongoUri(configService),
            }),
        }),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
