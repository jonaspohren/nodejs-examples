import express, { Request, Response } from "express";
import { IncomingMessage, createServer as createHttpServer } from "http";
import { WebSocket, Server as WebSocketServer } from "ws";

const port = 3000;
const app = express();

const httpServer = createHttpServer(app);
const webSocketServer = new WebSocketServer({ server: httpServer });

app.use(express.static("public"));

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

webSocketServer.on("connection", (ws: WebSocket, request: IncomingMessage) => {
  const webSocketKey = request.headers["sec-websocket-key"] || "";

  console.log(`connection [${webSocketKey}]`);

  ws.on("close", () => {
    console.log(`close [${webSocketKey}]`);
  });

  ws.on("message", (message: Buffer) => {
    /* webSocketServer.clients.forEach((client: WebSocket) => {
      client.send("message");
    }); */

    console.log(`message [${webSocketKey}]: ${message.toString("utf-8")}`);

    ws.send(message.toString("utf-8"));
  });
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
