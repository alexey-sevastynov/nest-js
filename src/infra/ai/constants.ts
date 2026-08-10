export const aiApiUrl = "https://openrouter.ai/api/v1/chat/completions";

export const aiDefaults = {
    model: "google/gemini-2.5-flash",
    maxTokens: 500,
} as const;

export const aiLogMessages = {
    chatSuccess: "AI chat completion successful",
    chatRequest: "Sending AI chat request",
} as const;

export const aiErrorMessages = {
    chatFailed: "AI chat completion failed",
    emptyResponse: "AI returned an empty response",
    apiError: "OpenRouter API error",
    requestTimeout: "AI chat request timed out",
} as const;
