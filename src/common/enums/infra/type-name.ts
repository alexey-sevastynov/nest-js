export const typeNames = {
    string: "string",
    number: "number",
    boolean: "boolean",
    object: "object",
    function: "function",
    undefined: "undefined",
    symbol: "symbol",
    bigint: "bigint",
} as const;

export type TypeName = (typeof typeNames)[keyof typeof typeNames];
