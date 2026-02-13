export const employeePositionKeys = {
    owner: "owner",
    manager: "manager",
    barista: "barista",
    seniorBarista: "seniorBarista",
    admin: "admin",
    cleaner: "cleaner",
    accountant: "accountant",
} as const;

export type EmployeePositionKey = (typeof employeePositionKeys)[keyof typeof employeePositionKeys];
