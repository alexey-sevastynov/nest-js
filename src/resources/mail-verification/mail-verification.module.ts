import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailVerificationService } from "./mail-verification.service";
import { MailVerificationController } from "./mail-verification.controller";
import { MailVerification, MailVerificationSchema } from "./mail-verification-schema";
import { UserModule } from "../../resources/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: MailVerification.name, schema: MailVerificationSchema }]),
        UserModule,
    ],
    providers: [MailVerificationService],
    controllers: [MailVerificationController],
    exports: [MailVerificationService],
})
export class MailVerificationModule {}
