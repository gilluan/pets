import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'
import { merge } from 'lodash'
import DateTime from './scalars/DateTime'

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
    endereco: Endereco
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
    usuario: User
  }

  type Consulta {
    id : ID
    timestamp: String
    diagnostico: String
    receita: String
    procedimentoPlanos: [ID]
    atendente: ID
    pet : ID!
  }
  
  type Plano {
    nome: String
    descricao: String
    procedimentoPlanos: [ProcedimentoPlano]
  }
  
  type Procedimento {
    nome: String,
    descricao: String,
    tipo: String
  }
  
  type ProcedimentoPlano {
    valorCusto: Float,
    valorVenda: Float,
    qtd: Int,
    carencia: Int,
    intervaloDias: Int,
    procedimento:  Procedimento
  }
  
  type Clinica {
    nome: String,
    cnpj: String,
    admins:  [User],
    funcionarios:  [User],
    planos:  [Plano]
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
    getConsulta(id: String): Consulta
    getConsultas: [Consulta]
    getConsultasByPet: [Consulta]
    getClinica(id: String): Clinica
    getClinicas: [Clinica]
    getClinicasByUser: [Clinica]
    getPlano(id: String): Plano
    getPlanos: [Plano]
    getPlanosByClinica: [Plano]
    getProcedimento(id: String): Procedimento
    getProcedimentos: [Procedimento]
    getProcedimentoPlano(id: String): ProcedimentoPlano
    getProcedimentoPlanos: [ProcedimentoPlano]
    getProcedimentoPlanosByPlano: [ProcedimentoPlano]
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
      id: ID!,
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
      id: ID!
    ): String

    createEditPet(
      id: ID,
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
      usuario: ID!
    ): Pet
    
    removePet(
      id: ID
    ): String

    createEditPlano(
      id: ID
      nome: String
      descricao: String
      procedimentoPlanos: [ID]
    ): Plano
    
    
    removePlano(
      id: ID
    ): String

    createEditConsulta(
      id: ID
      timestamp: String
      diagnostico: String
      receita: String
      procedimentoPlanos: [ID]
      atendente: ID
      pet : ID!
    ): Consulta
    
    removeConsulta(
      id: ID
    ): String

    createEditClinica(
      id: ID
      nome: String
      cnpj: String
      admins:  [ID]
      funcionarios:  [ID]
      planos:  [ID]
    ): Clinica
    
    removeClinica(
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
