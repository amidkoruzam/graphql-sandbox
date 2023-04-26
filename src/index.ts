import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { Resolvers } from "./__generated__/resolvers-types";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers: Resolvers = {
  Query: {
    books: () => books,
    booksByAuthor: (_, args) => {
      return books.filter((book) => book.author === args.author);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
