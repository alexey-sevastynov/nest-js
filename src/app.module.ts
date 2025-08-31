import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./infra/database/database.module";
import { TaskModule } from "./resources/task/task.module";
import { UserModule } from "./resources/user/user.module";
import { AddressModule } from "./resources/address/address.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TaskModule,
        UserModule,
        AddressModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
