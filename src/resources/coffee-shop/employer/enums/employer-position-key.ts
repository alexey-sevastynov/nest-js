export const employerPositionKeys = {
    owner: "owner",
    manager: "manager",
    barista: "barista",
    seniorBarista: "seniorBarista",
    admin: "admin",
    cleaner: "cleaner",
    accountant: "accountant",
} as const;

export type EmployerPositionKey = (typeof employerPositionKeys)[keyof typeof employerPositionKeys];
