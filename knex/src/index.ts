import "dotenv/config";
import Knex from "knex";
import { User } from "./user";

const knex = Knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  pool: { min: 0, max: 1 },
});

async function init() {
  try {
    await knex<User>("users").insert([
      { id: 1, name: "John" },
      { id: 2, name: "Jeff" },
    ]);

    const user = await knex<User>("users").where("id", 1).first();

    console.log(user);
  } catch (err) {
    console.log(err);
  } finally {
    await knex.destroy();
  }
}

init()
  .then()
  .catch((err) => {
    console.log(err);
  });
