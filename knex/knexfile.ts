import "dotenv/config";
import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    directory: "migrations",
    tableName: "migrations",
  },
};

export = config;
