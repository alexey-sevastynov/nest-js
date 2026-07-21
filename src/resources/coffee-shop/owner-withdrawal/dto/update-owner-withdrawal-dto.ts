import { PartialType } from "@nestjs/mapped-types";
import { CreateOwnerWithdrawalDto } from "./create-owner-withdrawal-dto";

export class UpdateOwnerWithdrawalDto extends PartialType(CreateOwnerWithdrawalDto) {}
