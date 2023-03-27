import { Database } from "fakebase";

const db = new Database("src/data");

export const Company = db.table("companies");
export const Job = db.table("jobs");
