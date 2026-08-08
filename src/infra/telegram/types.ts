import { type telegramMethods, type telegramActions } from "./constants";

export type TelegramAction = (typeof telegramActions)[keyof typeof telegramActions];
export type TelegramMethod = (typeof telegramMethods)[keyof typeof telegramMethods];

export interface TelegramBotResponse {
    ok: boolean;
    result?: TelegramMessageResult;
    description?: string;
}

export type TelegramNotifyOptions<T = Record<string, unknown>> =
    | TelegramNotifyMessageOptions<T>
    | TelegramNotifyDeleteOptions;

interface WithAdditionalProperties {
    [key: string]: unknown;
}

interface TelegramChat extends WithAdditionalProperties {
    id: number;
}

interface TelegramMessageResult extends WithAdditionalProperties {
    message_id: number;
    chat: TelegramChat;
}

interface TelegramNotifyBaseOptions {
    resource: string;
}

interface TelegramNotifyMessageOptions<T> extends TelegramNotifyBaseOptions {
    action: typeof telegramActions.create | typeof telegramActions.update;
    message: (data: T) => string;
}

interface TelegramNotifyDeleteOptions extends TelegramNotifyBaseOptions {
    action: typeof telegramActions.delete;
}
