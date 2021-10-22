require("dotenv/config");

const database =
    process.env.NODE_ENV === "test"
        ? process.env.POSTGRES_DB_TEST
        : process.env.POSTGRES_DB_PROD;
const port = process.env.NODE_ENV === "test" ? 5432 : undefined;
const host = process.env.NODE_ENV === "test" ? "database_test" : undefined;

const config = {
    type: "postgres",
    host: host || process.env.POSTGRES_HOST,
    port: port || Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database,
    entities: [`./src/modules/**/infra/typeorm/entities/*.ts`],
    migrations: [`./src/shared/infra/typeorm/migrations/*.ts`],
    cli: {
        migrationsDir: `./src/shared/infra/typeorm/migrations/`,
    },
};

module.exports = config;
