import Mongoose, { Schema } from 'mongoose'

Mongoose.Promise = global.Promise
Mongoose.set('debug', true)

const urlAtlas = 'mongodb://petapp:PetApp456!@cluster0-shard-00-00-2vm6a.mongodb.net:27017,cluster0-shard-00-01-2vm6a.mongodb.net:27017,cluster0-shard-00-02-2vm6a.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const urlLocal = 'mongodb://localhost/pet'
let url = ''

process.argv.forEach(arg => {
  if (arg === 'dev') {
    url = urlLocal
  } else {
    url = urlAtlas
  }
})

const mongo = Mongoose.connect(url, {
  useMongoClient: true
})

// TODO: verificar conexoes para performance
const UserSchema = Mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cpf: String,
  sexo: String,
  nascimento: String,
  rg: String,
  telefones: [String]
})

const EnderecoSchema = Mongoose.Schema({
  logradouro: String,
  complemento: String,
  cidade: String,
  bairro: String,
  uf: String,
  cep: String
})

const PetSchema = Mongoose.Schema({
  nome: String,
  especie: String,
  cor: String,
  raca: String,
  sexo: String,
  peso: Number,
  nascimento: String,
  criado: String,
  ativo: Boolean,
  comportamento: [String],
  observacoes: String,
  idUsuario: Schema.Types.ObjectId
})

const ConsultaSchema = Mongoose.Schema({
  timestamp: String,
  idPet: Schema.Types.ObjectId
})

const PlanoSchema = Mongoose.Schema({
  nome: String,
  descricao: String,
  admins: [Schema.Types.ObjectId],
  funcionarios: [Schema.Types.ObjectId],
  planos: [Schema.Types.ObjectId]
})

const ClinicaSchema = Mongoose.Schema({
  nome: String,
  cnpj: String,
  admins: [Schema.Types.ObjectId],
  funcionarios: [Schema.Types.ObjectId],
  planos: [Schema.Types.ObjectId]
})

const User = Mongoose.model('User', UserSchema)
const Endereco = Mongoose.model('Endereco', EnderecoSchema)
const Pet = Mongoose.model('Pet', PetSchema)
const Consulta = Mongoose.model('Consulta', ConsultaSchema)
const Clinica = Mongoose.model('Clinica', ClinicaSchema)

export { User, Endereco, Pet, Consulta }
