import { appModes } from "../../../common/enums/infra/app-mode";
import { envKeys } from "../../../common/enums/infra/env-key";
import { environments } from "../../enums/infra/environment";
import { getEnv } from "./env-functions";

export function isProd() {
    return getEnv(envKeys.nodeEnv) === environments.prod;
}

export function isDev() {
    return getEnv(envKeys.nodeEnv) === environments.dev;
}

export function isTest() {
    return getEnv(envKeys.nodeEnv) === environments.test;
}

export function isStandaloneMode() {
    return getEnv(envKeys.appMode) === appModes.standalone;
}

export function isServerlessMode() {
    return getEnv(envKeys.appMode) === appModes.serverless;
}
