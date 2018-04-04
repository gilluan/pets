import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const parse = value => {
  console.log('Parse : ' + value)
  return new Date(value) // value from the client
}

const serialize = value => {
  console.log('Serialize : ' + value)
  return value.getTime() // value sent to the client
}

const parseLiteral = ast => {
  if (ast.kind === Kind.INT) {
    console.log('Parse Literal : ' + ast.value)
    return parseInt(ast.value, 10) // ast value is always in string format
  }
  return null
}

const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize: serialize,
  parseValue: parse,
  parseLiteral: parseLiteral
})

export default Date
