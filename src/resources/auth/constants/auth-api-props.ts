export const emailApiProps = {
    type: String,
    required: true,
    uniqueItems: true,
    example: "johnDoe@example.com",
};

export const passwordApiProps = {
    type: String,
    required: true,
    example: "User12345!",
};
