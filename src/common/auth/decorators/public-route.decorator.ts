import { SetMetadata } from "@nestjs/common";
import { authMetadataKeys } from "../constants/auth-metadata-key";

export const PublicRoute = () => SetMetadata(authMetadataKeys.isPublicRoute, true);
