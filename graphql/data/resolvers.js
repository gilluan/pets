import { User, Pet } from './connectors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isAuthenticatedResolver } from './authenticatedResolver'

const resolvers = {
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
      return await Pet.find({ 'usuario._id': id })
    }
    // isAuthenticatedResolver.createResolver(
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
      console.log(JSON.stringify(args))
      let user = await User.findOneAndUpdate({ _id: args.id }, args,
        (err) => {
          console.log(err)
        })
      return { user }
    },
    async removeUser (parent, args, context, info) {
      await User.remove({ _id: args.id })
      return { message: 'removed' }
    },

    // ========== Mutations Pets ========================================================================
    async createPet (parent, args, context, info) {
      args.criado = new Date().toString()
      let pet = await new Pet(args).save()
      return pet
    },
    async editPet (parent, args, context, info) {
      let pet = await Pet.findOneAndUpdate({ _id: args.id }, args)
      return { pet }
    },
    async removePet (parent, args, context, info) {
      await Pet.remove({ _id: args.id })
      return { message: 'removed' }
    }
  }
}

export default resolvers
