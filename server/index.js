import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const server = new ApolloServer({
  typeDefs: `
        type Todo{
            id: ID!
            title:String!
            completed:Boolean
            userId:String!
            user: User  
        }

        type User{
            id: ID!
            name:String!
            username:String
            email:String!
            phone:String!
        }


    type Query{
    getTodos:[Todo]    
    getAllUsers:[User]
    getUser(id:ID!):User
    }

    `,
  resolvers: {
    Todo: {
      user: async (todo) =>
        (
          await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.userId}`
          )
        ).data,
    },

    Query: {
      getTodos: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/todos/")).data,

      getAllUsers: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/users/")).data,
      getUser: async (parent, { id }) =>
        (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
          .data,
    },
  },
});
await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(3000, () => console.log(`Running on 3000`));
