import { User } from './connectors'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isAuthenticatedResolver } from './authenticatedResolver';

const resolvers = {
    Query: {
        getUser:  isAuthenticatedResolver.createResolver(async (parent, {id}, context, info) => {
            return await User.findById(id);
        }),
        getUsers: isAuthenticatedResolver.createResolver(async (parent, args, context, info) => {
            return await User.find();
        })
    },
    Mutation: {
         async createUser(parent, args, context, info) {
             console.log(args);
             let user = await new User(args).save();
             console.log('saved', user)
             return user;
         },
         async signup(parent, args, { SECRET_KEY }, info) {
            const password = await bcrypt.hash(args.password, 10)

            let newUser = Object.assign({}, args, {password})

            let user = await new User(newUser).save()

            const { _id } = user;

            const token = jwt.sign({userId: _id}, SECRET_KEY)

            return { user, token }
         },
         async login(parent, { email, password }, { SECRET_KEY }, info) {
            const user = await User.findOne({ email })

            if(!user) { throw new Error(`Could not find user with email: ${email}`) }

            const valid = await bcrypt.compare(password, user.password)

            if(!valid) { throw new Error('Invalid password') }

            const token = jwt.sign({userId: user.id}, SECRET_KEY)

            return { token, user };
         },
         async editUser(parent, args, context, info) {
            let user = await User.findOneAndUpdate({_id: args.id}, args);
            return { user };
         },
         async removeUser(parent, args, context, info) {
            await User.remove({_id: args.id});
            return {message: "removed"}
         }
    }
}

export default resolvers;
