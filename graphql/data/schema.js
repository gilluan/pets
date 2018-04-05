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
    nascimento: String
    cpf: String
    sexo: String
    rg: String
    telefones: [String!]
  }

  input UserInput {
    id: ID
    email: String
    name: String
    password: String
    nascimento: String
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
    id: ID
    nome: String,
    especie: String,
    cor: String,
    raca: String,
    sexo: String,
    peso: Float,
    nascimento: String,
    criado: String,
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
      nascimento: String
      sexo: String,
      rg: String,
      telefones: [String!],
      birthDate: String
    ): User
    
    editUser(
      id: ID,
      email: String!,
      password: String!,
      name: String!,
      nascimento: String
      cpf: String,
      sexo: String,
      rg: String,
      telefones: [String!],
      birthDate: String
    ): User
    
    removeUser(
      id: ID
    ): String

    createPet(
      nome: String!,
      especie: String,
      cor: String,
      raca: String,
      sexo: String,
      peso: Float,
      nascimento: String,
      criado: String,
      ativo: Boolean,
      comportamento: [String],
      observacoes: String,
      usuario: UserInput!
    ): Pet
    
    editPet(
      id: ID
      nome: String,
      cor: String,
      sexo: String,
      peso: Float,
      ativo: Boolean,
      comportamento: [String],
      observacoes: String,
      usuario: UserInput
    ): Pet
    
    removePet(
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
