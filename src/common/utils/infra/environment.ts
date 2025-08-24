import { environments } from "../../../common/enums/environment";

export function isProd() {
    return process.env.NODE_ENV === environments.prod;
}

export function isDev() {
    return process.env.NODE_ENV === environments.dev;
}

export function isTest() {
    return process.env.NODE_ENV === environments.test;
}
