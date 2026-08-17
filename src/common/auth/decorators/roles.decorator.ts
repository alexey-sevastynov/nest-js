import { SetMetadata } from "@nestjs/common";
import { type UserRoleKey } from "../../../resources/user/enums/user-role-key";
import { authMetadataKeys } from "../constants/auth-metadata-key";

export const Roles = (...roles: UserRoleKey[]) => SetMetadata(authMetadataKeys.roles, roles);
