import { PartialType } from "@nestjs/mapped-types";
import { CreateFacilityExpenseDto } from "./create-facility-expense-dto";

export class UpdateFacilityExpenseDto extends PartialType(CreateFacilityExpenseDto) {}
