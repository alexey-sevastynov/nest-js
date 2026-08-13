import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { authMetadataKeys } from "../../../common/auth/constants/auth-metadata-key";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublicRoute = this.reflector.getAllAndOverride<boolean>(authMetadataKeys.isPublicRoute, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublicRoute) {
            return true;
        }

        return super.canActivate(context);
    }
}
