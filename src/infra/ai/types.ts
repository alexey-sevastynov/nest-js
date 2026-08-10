export interface AiChatOptions {
    model?: string;
    maxTokens?: number;
    timeoutMs?: number;
}

export interface OpenRouterMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface OpenRouterRequestBody {
    model: string;
    messages: OpenRouterMessage[];
    max_tokens: number;
}

export interface OpenRouterChoice {
    message: {
        role: string;
        content: string;
    };
}

export interface OpenRouterResponse {
    choices?: OpenRouterChoice[];
    error?: {
        message: string;
        code: number;
    };
}
