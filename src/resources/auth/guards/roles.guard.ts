import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { authMetadataKeys } from "../../../common/auth/constants/auth-metadata-key";
import { type AuthenticatedUser } from "../../../common/auth/types/authenticated-user";
import { errorMessages } from "../../../common/constants/error-messages";
import { type UserRoleKey } from "../../user/enums/user-role-key";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRoleKey[]>(authMetadataKeys.roles, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles?.length) {
            return true;
        }

        const request = context.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
        const hasRequiredRole = requiredRoles.includes(request.user.userRole);

        if (!hasRequiredRole) {
            throw new ForbiddenException(errorMessages.insufficientPermissions);
        }

        return true;
    }
}
