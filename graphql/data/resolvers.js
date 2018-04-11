import { User, Endereco, Pet, Consulta, Clinica, Plano, Procedimento, ProcedimentoPlano } from './connectors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isAuthenticatedResolver } from './authenticatedResolver'

const resolvers = {

  // isAuthenticatedResolver.createResolver(

  Query: {
    // ========== Queries User ========================================================================

    getUser: async (parent, { id }, context, info) => {
      return await User.findById(id)
    },
    getUsers: async (parent, args, context, info) => {
      return await User.find()
    },

    // ========== Queries Pets ========================================================================

    getPets: async (parent, args, context, info) => {
      return await Pet.find()
    },
    getPet: isAuthenticatedResolver.createResolver(async (parent, { id }, context, info) => {
      return await Pet.findById(id)
    }),
    getPetsByUser: async (parent, { id }, context, info) => {
      return await Pet.find({ 'usuario': id })
    },

    // ========== Queries Consultas =====================================================================

    getConsultas: async (parent, args, context, info) => {
      return await Consulta.find()
    },

    getConsultasByPet: async (parent, args, context, info) => {
      return await Consulta.find()
    },

    // ========== Queries Clinicas ======================================================================

    getClinicas: async (parent, args, context, info) => {
      return await Clinica.find()
    },

    getClinicasByUser: async (parent, args, context, info) => {
      return await Clinica.find()
    },

    // ========== Queries Planos ========================================================================

    getPlanos: async (parent, args, context, info) => {
      return await Plano.find()
    },

    getPlanosByClinica: async (parent, args, context, info) => {
      return await Plano.find()
    },

    // ========== Queries Procedimentos ========================================================================

    getProcedimentos: async (parent, args, context, info) => {
      return await Procedimento.find()
    },

    // ========== Queries Procedimento Planos ========================================================================

    getProcedimentoPlanos: async (parent, args, context, info) => {
      return await ProcedimentoPlano.find()
    },

    getProcedimentoPlanosByPlano: async (parent, args, context, info) => {
      return await ProcedimentoPlano.find()
    }

  },
  Mutation: {

    // ========== Mutations Login ========================================================================

    async signup (parent, args, { SECRET_KEY }, info) {
      const password = await bcrypt.hash(args.password, 10)
      let newUser = Object.assign({}, args, { password })
      let user = await new User(newUser).save()
      const { _id } = user
      const token = jwt.sign({ userId: _id }, SECRET_KEY)
      return { user, token }
    },
    async login (parent, { email, password }, { SECRET_KEY }, info) {
      const user = await User.findOne({ email })
      if (!user) { throw new Error(`Could not find user with email: ${email}`) }
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) { throw new Error('Invalid password') }
      const token = jwt.sign({ userId: user.id }, SECRET_KEY)
      return { token, user }
    },

    // ========== Mutations Users ========================================================================
    async createUser (parent, args, context, info) {
      let user = await new User(args).save()
      return user
    },
    async editUser (parent, args, context, info) {
      let user = await User.findByIdAndUpdate(args.id, args, { new: true }).exec((err, doc) => {
        if (err) {
          console.error(err)
        }
      })
      return user
    },
    async removeUser (parent, args, context, info) {
      await User.remove({ _id: args.id })
      return { message: 'removed' }
    },

    // ========== Mutations Pets ========================================================================

    async createEditPet (parent, args, context, info) {
      if (args._id) {
        let pet = await Pet.findByIdAndUpdate(args.id, args, { new: true }).exec((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return pet
      } else {
        args.criado = new Date().toString()
        let pet = await new Pet(args).save((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        pet = Pet.findById(pet._id).populate('usuario')
        return pet
      }
    },

    async removePet (parent, args, context, info) {
      await Pet.remove({ _id: args.id })
      return { message: 'removed' }
    },

    async createEditPlano (parent, args, context, info) {
      if (args._id) {
        let plano = await Plano.findByIdAndUpdate(args.id, args, { new: true }).exec((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return plano
      } else {
        let plano = await Plano.save((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return plano
      }
    },

    async removePlano (parent, args, context, info) {
      await Plano.remove({ _id: args.id })
      return { message: 'removed' }
    },

    async createEditConsulta (parent, args, context, info) {
      if (args._id) {
        let consulta = await Consulta.findByIdAndUpdate(args.id, args, { new: true }).exec((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return consulta
      } else {
        let consulta = await Consulta.save((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return consulta
      }
    },

    async removeConsulta (parent, args, context, info) {
      await Consulta.remove({ _id: args.id })
      return { message: 'removed' }
    },

    async createEditClinica (parent, args, context, info) {
      if (args._id) {
        let clinica = await Clinica.findByIdAndUpdate(args.id, args, { new: true }).exec((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return clinica
      } else {
        let clinica = await Clinica.save((err, doc) => {
          if (err) {
            console.error(err)
          }
        })
        return clinica
      }
    },

    async removeClinica (parent, args, context, info) {
      await Plano.remove({ _id: args.id })
      return { message: 'removed' }
    }

  }
}

export default resolvers
