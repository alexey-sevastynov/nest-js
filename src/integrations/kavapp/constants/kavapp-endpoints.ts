export const kavappEndpoints = {
    login: "/admin/login",
    inventory: (pointId: string) => `/nowreport/${pointId}`,
} as const;
