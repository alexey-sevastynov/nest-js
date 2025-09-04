import type { ConfigService } from "@nestjs/config";
import { envKeys } from "../../common/enums/infra/env-key";
import { getRequiredEnv } from "../../common/utils/infra/env-functions";

export function getMongoUri(configService: ConfigService) {
    const user = getRequiredEnv(envKeys.mongoUser, configService);
    const password = getRequiredEnv(envKeys.mongoPassword, configService);
    const cluster = getRequiredEnv(envKeys.mongoCluster, configService);
    const dbName = getRequiredEnv(envKeys.mongoDb, configService);

    const uri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

    return uri;
}
