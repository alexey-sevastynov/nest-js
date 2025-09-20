import dotenv from "dotenv";

export function getDotenvConfig() {
    const result = dotenv.config();

    return result;
}
