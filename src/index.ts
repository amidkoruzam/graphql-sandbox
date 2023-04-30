import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { Resolvers } from "./__generated__/resolvers-types";
import { CountryObject } from "./models";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const typeDefs = readFileSync(__dirname + "./schema.graphql", {
  encoding: "utf-8",
});

const countries: CountryObject[] = [
  {
    id: 1,
    name: "United States",
  },
  {
    id: 2,
    name: "Canada",
  },
];

const authors = [
  {
    id: 1,
    firstName: "Kate",
    lastName: "Chopin",
  },
  {
    id: 2,
    firstName: "Paul",
    lastName: "Auster",
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
  Book: {
    author: (book) => authors.find((author) => author.id === book.author),
  },
  Author: {
    name: (author) => `${author.firstName} ${author.lastName}`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
