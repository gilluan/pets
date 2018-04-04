import Mongoose from 'mongoose'

Mongoose.Promise = global.Promise

const mongo = Mongoose.connect('mongodb://localhost/pet', {
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
  usuario: UserSchema
})

const postSaveLog = (tipo, doc) => {
  console.log(tipo + ' foi inserido com id : ' + doc._id)
}

UserSchema.post('save', (doc) => postSaveLog('User', doc))
PetSchema.post('save', (doc) => postSaveLog('Pet', doc))

const User = Mongoose.model('User', UserSchema)
const Endereco = Mongoose.model('Endereco', EnderecoSchema)
const Pet = Mongoose.model('Pet', PetSchema)

export { User, Endereco, Pet }
