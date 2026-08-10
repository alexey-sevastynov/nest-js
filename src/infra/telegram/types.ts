import { type AiService } from "../ai/ai.service";
import { type telegramMethods, type telegramActions } from "./constants";

export type TelegramAction = (typeof telegramActions)[keyof typeof telegramActions];
export type TelegramMethod = (typeof telegramMethods)[keyof typeof telegramMethods];

export type MessageFn<T = Record<string, unknown>> = (data: T) => string | Promise<string>;
export type MessageFactory<T = Record<string, unknown>> = (aiService: AiService) => MessageFn<T>;

export interface TelegramBotResponse {
    ok: boolean;
    result?: TelegramMessageResult;
    description?: string;
}

export type TelegramNotifyOptions<T = Record<string, unknown>> =
    | TelegramNotifyWithMessage<T>
    | TelegramNotifyWithFactory<T>
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

interface TelegramNotifyWithMessage<T> extends TelegramNotifyBaseOptions {
    action: typeof telegramActions.create | typeof telegramActions.update;
    message: MessageFn<T>;
    messageFactory?: never;
}

interface TelegramNotifyWithFactory<T> extends TelegramNotifyBaseOptions {
    action: typeof telegramActions.create | typeof telegramActions.update;
    message?: never;
    messageFactory: MessageFactory<T>;
}

interface TelegramNotifyDeleteOptions extends TelegramNotifyBaseOptions {
    action: typeof telegramActions.delete;
}
