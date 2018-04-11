import Mongoose, { Schema } from 'mongoose'

Mongoose.Promise = global.Promise
Mongoose.set('debug', true)

const urlAtlas = 'mongodb://petapp:PetApp456!@cluster0-shard-00-00-2vm6a.mongodb.net:27017,cluster0-shard-00-01-2vm6a.mongodb.net:27017,cluster0-shard-00-02-2vm6a.mongodb.net:27017/pets?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const urlLocal = 'mongodb://localhost/pet'
let url = ''

process.argv.forEach(arg => {
  if (arg === 'prod') {
    url = urlAtlas
  } else {
    url = urlLocal
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
  telefones: [String],
  endereco: { type: Schema.Types.ObjectId, ref: 'Endereco' }
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
  usuario: { type: Schema.Types.ObjectId, ref: 'User' }
})

const ConsultaSchema = Mongoose.Schema({
  timestamp: String,
  diagnostico: String,
  receita: String,
  procedimentoPlanos: [{ type: Schema.Types.ObjectId, ref: 'ProcedimentoPlano' }],
  atendente: { type: Schema.Types.ObjectId, ref: 'User' },
  pet: { type: Schema.Types.ObjectId, ref: 'Pet' }
})

const PlanoSchema = Mongoose.Schema({
  nome: String,
  descricao: String,
  procedimentoPlanos: [{ type: Schema.Types.ObjectId, ref: 'ProcedimentoPlano' }]
})

const ProcedimentoSchema = Mongoose.Schema({
  nome: String,
  descricao: String,
  tipo: String
})

const ProcedimentoPlanoSchema = Mongoose.Schema({
  valorCusto: Number,
  valorVenda: Number,
  qtd: Number,
  carencia: Number,
  intervaloDias: Number,
  procedimento: [{ type: Schema.Types.ObjectId, ref: 'Procedimento' }]
})

const ClinicaSchema = Mongoose.Schema({
  nome: String,
  cnpj: String,
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  funcionarios: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  planos: [{ type: Schema.Types.ObjectId, ref: 'Plano' }]
})

const User = Mongoose.model('User', UserSchema)
const Endereco = Mongoose.model('Endereco', EnderecoSchema)
const Pet = Mongoose.model('Pet', PetSchema)
const Consulta = Mongoose.model('Consulta', ConsultaSchema)
const Clinica = Mongoose.model('Clinica', ClinicaSchema)
const Plano = Mongoose.model('Plano', PlanoSchema)
const Procedimento = Mongoose.model('Procedimento', ProcedimentoSchema)
const ProcedimentoPlano = Mongoose.model('ProcedimentoPlano', ProcedimentoPlanoSchema)

export { User, Endereco, Pet, Consulta, Clinica, Plano, Procedimento, ProcedimentoPlano }
