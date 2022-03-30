export default {
    development: {
        DB_USERNAME: process.env.DB_USERNAME || "postgres",
        DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
        HOST: process.env.DB_HOST || "localhost",
        PORT: parseInt(process.env.DB_PORT!) || 5432,
        DATABASE: process.env.DB_DATABASE || "postgres",
        DIALECT: "postgres"
    },

    test: {
        DB_USERNAME: process.env.DB_TEST_USERNAME || "postgres",
        DB_PASSWORD: process.env.DB_TEST_PASSWORD || "postgres",
        HOST: process.env.DB_TEST_HOST || "localhost",
        PORT: parseInt(process.env.DB_TEST_PORT!) || 5433,
        DATABASE: process.env.DB_TEST_DATABASE || "postgres",
        DIALECT: "postgres"
    }
}