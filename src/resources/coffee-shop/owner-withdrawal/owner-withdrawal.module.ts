import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OwnerWithdrawalService } from "./owner-withdrawal.service";
import { OwnerWithdrawalController } from "./owner-withdrawal.controller";
import { OwnerWithdrawal, OwnerWithdrawalSchema } from "./owner-withdrawal-schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: OwnerWithdrawal.name, schema: OwnerWithdrawalSchema }])],
    controllers: [OwnerWithdrawalController],
    providers: [OwnerWithdrawalService],
    exports: [OwnerWithdrawalService],
})
export class OwnerWithdrawalModule {}
