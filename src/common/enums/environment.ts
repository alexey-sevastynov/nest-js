export const environments = {
    dev: "development",
    test: "test",
    prod: "production",
} as const;

export type Environment = (typeof environments)[keyof typeof environments];
