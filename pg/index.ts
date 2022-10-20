import { Pool } from "pg";

const pool = new Pool({
  max: 1,
  // idleTimeoutMillis: 1000,
  allowExitOnIdle: true,
});

type Product = {
  id: number;
  description: string | null;
  quantity: number;
};

pool
  .query(`CREATE TABLE IF NOT EXISTS product ("id" SERIAL PRIMARY KEY, "description" TEXT, "quantity" INTEGER NOT NULL)`)
  .then(() => pool.query<Product>(`INSERT INTO product (description, quantity) VALUES ($1, $2), ($3, $4) RETURNING *`, ["A", 1, "B", 2]))
  .then(() => pool.query<Product>(`UPDATE product SET description = v.description FROM (VALUES ($1::INTEGER, $2), ($3::INTEGER, $4)) AS v (id, description) WHERE v.id = product.id RETURNING *`, [1, "A2", 2, "B2"]))
  .then(() => pool.query<Product>(`SELECT * FROM product`))
  .then((result) => console.log(result.rows))
  .catch((err) => console.log(err));
