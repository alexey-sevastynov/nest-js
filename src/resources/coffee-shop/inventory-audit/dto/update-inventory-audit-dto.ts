import { PartialType } from "@nestjs/mapped-types";
import { CreateInventoryAuditDto } from "./create-inventory-audit-dto";

export class UpdateInventoryAuditDto extends PartialType(CreateInventoryAuditDto) {}
