export const kavappEndpoints = {
    login: "/admin/login",
    inventory: (pointId: string) => `/nowreport/${pointId}`,
    catalog: {
        product: "/product",
        cup: "/cup",
        ingredient: "/ingredient",
    },
} as const;
