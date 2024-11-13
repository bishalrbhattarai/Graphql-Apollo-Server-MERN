import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
app.use(express.json());
const server = new ApolloServer({
  typeDefs: `
        type Todo{
            id: ID!
            title:String!
            completed:Boolean
        }

    type Query{
    getTodos:[Todo]    
    }

    `,
  resolvers: {},
});
await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(3000, () => console.log(`Running on 3000`));
