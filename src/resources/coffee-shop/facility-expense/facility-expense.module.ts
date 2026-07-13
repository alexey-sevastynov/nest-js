import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FacilityExpenseService } from "./facility-expense.service";
import { FacilityExpenseController } from "./facility-expense.controller";
import { FacilityExpense, FacilityExpenseSchema } from "./facility-expense-schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: FacilityExpense.name, schema: FacilityExpenseSchema }])],
    controllers: [FacilityExpenseController],
    providers: [FacilityExpenseService],
    exports: [FacilityExpenseService],
})
export class FacilityExpenseModule {}
