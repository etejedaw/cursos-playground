const environment = {
    PORT: parseInt(process.env.PORT!) || 8080,
    NODE_ENV: process.env.NODE_ENV || "production",
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS!) || 10,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "randomString",
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "otherRandomString"
}

export default environment;