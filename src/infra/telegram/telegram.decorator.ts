import { SetMetadata } from "@nestjs/common";
import { type TelegramNotifyOptions } from "./types";

export const telegramNotifyMetadata = "telegramNotifyMetadata";

export const TelegramNotify = <T = Record<string, unknown>>(options: TelegramNotifyOptions<T>) =>
    SetMetadata(telegramNotifyMetadata, options);
