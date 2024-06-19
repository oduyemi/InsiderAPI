import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

const graphqlMiddleware = graphqlHTTP({
  schema,
  graphiql: true
});

export default graphqlMiddleware;
