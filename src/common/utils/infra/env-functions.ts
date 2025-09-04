import type { ConfigService } from "@nestjs/config";
import type { EnvKey } from "../../enums/infra/env-key";
import { errorMessages } from "../../../common/constants/error-messages";

export function getEnv(key: EnvKey, configService?: ConfigService) {
    const value = configService ? configService.get<string>(key) : process.env[key];

    return value;
}

export function getRequiredEnv(key: EnvKey, configService?: ConfigService) {
    const value = configService ? configService.get<string>(key) : process.env[key];

    if (!value) {
        throw new Error(errorMessages.requiredEnv.replace("{0}", key));
    }

    return value;
}
