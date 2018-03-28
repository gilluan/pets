import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import resolvers from './data/resolvers';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const GRAPHQL_PORT = 4000;

const SECRET_KEY = 'mySecretKey';

const graphQLServer = express();

const addUser = async (req, res, next) => {
  const authorization = req.headers ? req.headers.authorization : {};
  const token = authorization ? authorization.token : "";

if(token) {
  try {

    const { user } = await jwt.verify(token, SECRET_KEY);
    req.user = user;
  } catch (err) {
    console.log(' Erro na verificacao do token', err);
  }

    }

  next();
};

graphQLServer.use(cors());

graphQLServer.use(addUser);

graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      SECRET_KEY,
      user: req.user,
    },
  })),
);

graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
