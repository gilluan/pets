import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'
import { merge } from 'lodash'
import DateTime from './scalars/DateTime'
import Date from './scalars/Date'

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
  
  type Pet {
    nome: String,
    especie: String,
    cor: String,
    raca: String,
    sexo: String,
    peso: Float,
    nascimento: DateTimeScalar,
    criado: DateTimeScalar,
    ativo: Boolean,
    comportamento: [String],
    observacoes: String,
    usuario: User!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    getUser(id: String): User
    getUsers: [User!]!
    getPets: [Pet!]!
    getPet(id : String): Pet
    getPetsByUser(id: String) : [Pet]
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
`

const resolveDateTimeScalar = {
  DateTimeScalar: DateTime
  // DateScalar: Date
}

// const allResolvers = merge(resolveDateTimeScalar, resolvers)

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
