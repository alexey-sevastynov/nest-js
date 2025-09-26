import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PasswordResetService } from "./password-reset.service";
import { PasswordResetController } from "./password-reset.controller";
import { User, UserSchema } from "../../resources/user/user-schema";
import { MailVerificationModule } from "../../resources/mail-verification/mail-verification.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || "super-secret",
            signOptions: { expiresIn: "15m" },
        }),
        MailVerificationModule,
    ],
    controllers: [PasswordResetController],
    providers: [PasswordResetService],
    exports: [PasswordResetService],
})
export class PasswordResetModule {}
