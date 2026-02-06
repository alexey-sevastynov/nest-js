import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./infra/database/database.module";
import { TaskModule } from "./resources/task/task.module";
import { UserModule } from "./resources/user/user.module";
import { AddressModule } from "./resources/address/address.module";
import { AuthModule } from "./resources/auth/auth.module";
import { PasswordResetModule } from "./resources/password-reset/password-reset.module";
import { EmployerModule } from "./resources/coffee-shop/employer/employer.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TaskModule,
        UserModule,
        AddressModule,
        AuthModule,
        PasswordResetModule,
        EmployerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
