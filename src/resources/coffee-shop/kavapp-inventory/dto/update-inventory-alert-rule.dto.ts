import { PartialType } from "@nestjs/mapped-types";
import { CreateInventoryAlertRuleDto } from "./create-inventory-alert-rule.dto";

export class UpdateInventoryAlertRuleDto extends PartialType(CreateInventoryAlertRuleDto) {}
