import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { merge } from 'lodash';
import DateTime from './scalars/DateTime';

const typeDefs = `
  scalar DateTimeScalar
  
  type User {
    id: ID
    email: String
    name: String
    password: String
    cpf: String
    sexo: String
    rg: String
    telefones: [String!]
  }

  type Endereco {
    logradouro: String
    complemento: String
    cidade: String
    bairro: String
    uf: String
    cep: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    getUser(id: String): User
    getUsers: [User!]!
  }

  type Mutation {
    signup(
      email: String!, 
      password: String!, 
      name: String!): AuthPayload
    
    login(
      email: String!, 
      password: String!
    ): AuthPayload
    
    createUser(
      email: String!,
      password: String!,
      name: String!,
      cpf: String,
      sexo: String,
      rg: String,
      telefones: [String!],
      birthDate: DateTimeScalar
    ): User
    
    editUser(
      id: ID,
      email: String!,
      password: String!,
      name: String!,
      cpf: String,
      sexo: String,
      rg: String,
      telefones: [String!],
      birthDate: DateTimeScalar
    ): User
    
    removeUser(
      id: ID
    ): String
  }
`;

const resolveDateTimeScalar = {
  DateTimeScalar: DateTime
};

//const allResolvers = merge(resolveDateTimeScalar, resolvers);

const schema = makeExecutableSchema({ typeDefs,resolvers });

export default schema;
