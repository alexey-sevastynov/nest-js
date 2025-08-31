export const addressValidation = {
    country: {
        minLength: 2,
        maxLength: 56,
    },
    region: {
        minLength: 2,
        maxLength: 100,
    },
    city: {
        minLength: 2,
        maxLength: 100,
    },
    street: {
        minLength: 2,
        maxLength: 120,
    },
    houseNumber: {
        minLength: 1,
        maxLength: 10,
    },
    apartment: {
        minLength: 1,
        maxLength: 10,
    },
    postalCode: {
        minLength: 5,
        maxLength: 6,
    },
};
