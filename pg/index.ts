import { Pool } from "pg";
import format from "pg-format";

const pool = new Pool({
  max: 1,
  // idleTimeoutMillis: 1000,
  allowExitOnIdle: true,
});

const query = format(
  `select count(*) from %I where %I ilike %L`,
  "<TABLE>",
  "<COLUMN>",
  "%<STRING>%"
);

pool.query(query, (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});
