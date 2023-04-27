import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { Resolvers } from "./__generated__/resolvers-types";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const authors = [
  {
    id: 1,
    name: "Kate Chopin",
  },
  {
    id: 2,
    name: "Paul Auster",
  },
];

const books = [
  {
    title: "The Awakening",
    author: 1,
  },
  {
    title: "City of Glass",
    author: 2,
  },
];

const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
