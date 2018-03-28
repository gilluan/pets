import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/pet', {
  useMongoClient: true
});

//TODO: verificar conexoes para performance
const UserSchema = Mongoose.Schema({
  name: String,
  email: String,
  password: String,
  sexo: String,
  birthDate: Date,
  rg: String,
  telefones: [String]
});

const User = Mongoose.model('User', UserSchema);


export { User };
