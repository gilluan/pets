import React from 'react'
import { withRouter } from 'react-router-dom'
import UserForm from '../components/user/UserForm'
import { ApolloClient } from 'apollo-client'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'



const SIGN_UP = gql`

mutation signup(
      $email: String!, 
      $password: String!, 
      $name: String!)
      {
      signup(email: $email, password: $password, name: $name){
        token
      }

      }
`

const redirectLogin = (props) => {
  props.history.replace('/login')
    // const { getUsers } = cache.readQuery({ query: QUERY_LIST_USERS }) || [];
    // cache.writeQuery({
    //   query: QUERY_LIST_USERS,
    //   data: {getUsers: [...getUsers, createUser] }
    // });
}



const UserPage = props => (
  <div className='addUserForm'>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Mutation
              mutation={SIGN_UP}
              update={() => redirectLogin(props)}> 
          {(createUser => (
               <UserForm createUser={createUser} signup={true}/>
          ))}
        </Mutation>
      </Grid.Column>
    </Grid>
  </div>

)

export default withRouter(UserPage)
