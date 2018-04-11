# GraghQL endpoints

# Queries

- getUser(id: String): User
- getUsers: [User!]!
- getPets: [Pet!]!
- getPet(id : String): Pet
- getPetsByUser(id: String) : [Pet]
- getConsulta(id: String): Consulta
- getConsultas: [Consulta]
- getConsultasByPet: [Consulta]
- getClinica(id: String): Clinica
- getClinicas: [Clinica]
- getClinicasByUser: [Clinica]
- getPlano(id: String): Plano
- getPlanos: [Plano]
- getPlanosByClinica: [Plano]
- getProcedimento(id: String): Procedimento
- getProcedimentos: [Procedimento]
- getProcedimentoPlano(id: String): ProcedimentoPlano
- getProcedimentoPlanos: [ProcedimentoPlano]
- getProcedimentoPlanosByPlano: [ProcedimentoPlano]


# Mutations

- signup
(email: String!
password: String!
name: String!): AuthPayload

- login
(email: String!password: String!): AuthPayload

- createUser
(email: String!
password: String!
name: String!
cpf: String
nascimento: String
sexo: String
rg: String
telefones: [String!]
birthDate: String): User

- editUser
(id: ID!
email: String!
password: String!
name: String!
nascimento: String
cpf: String
sexo: String
rg: String
telefones: [String!]
birthDate: String): User

- removeUser
(id: ID!): String

- createPet
(nome: String!
especie: String
cor: String
raca: String
sexo: String
peso: Float
nascimento: String
criado: String
ativo: Boolean
comportamento: [String]
observacoes: String
idUsuario: ID!): Pet

- editPet
(id: ID
nome: String
cor: String
sexo: String
peso: Float
ativo: Boolean
comportamento: [String]
observacoes: String
usuario: UserInput): Pet

- removePet
(id: ID): String