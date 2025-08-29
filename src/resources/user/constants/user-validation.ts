export const userValidation = {
    userName: {
        minLength: 3,
        maxLength: 50,
    },
    firstName: {
        minLength: 2,
        maxLength: 50,
    },
    lastName: {
        minLength: 2,
        maxLength: 50,
    },
    email: {
        minLength: 5,
        maxLength: 254,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        minLength: 8,
        maxLength: 128,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    },
    phoneNumber: {
        minLength: 10,
        maxLength: 15,
        regex: /^\+?[1-9]\d{9,14}$/,
    },
    blockReason: {
        minLength: 3,
        maxLength: 255,
    },
};
