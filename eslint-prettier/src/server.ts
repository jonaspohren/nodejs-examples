import express, { Request, Response } from "express";

const port = 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
