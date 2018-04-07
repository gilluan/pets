import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'

// Add apollo
import { ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

const urlVPS = 'http://167.99.11.98:4000/graphql'
const urlLocal = 'http://localhost:4000/graphql'

// TODO: substituir o link por uma variavel de ambiente
const httpLink = createHttpLink({ uri: urlVPS })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('userToken')
  operation.setContext({
    headers: {
      authorization: token
    }
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
})

render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
