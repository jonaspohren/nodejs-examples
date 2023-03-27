import { ApolloServer } from "@apollo/server";
import { createServer } from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer as useWsServer } from "graphql-ws/lib/use/ws";
import { readFile } from "fs/promises";
import express from "express";
import bodyParser from "body-parser";
import { resolvers } from "./resolvers.js";

const app = express();
const httpServer = createServer(app);

const typeDefs = await readFile("src/schema.graphql", "utf8");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useWsServer({ schema }, wsServer);

const apolloServer = new ApolloServer<{ authorization: string }>({
  schema,
  plugins: [],
});

await apolloServer.start();

app.use(
  "/graphql",
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => Promise.resolve({ authorization: req.headers.authorization }),
  })
);

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
