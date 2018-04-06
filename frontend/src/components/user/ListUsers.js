import React from 'react';
import { Query } from 'react-apollo';
import UserTable from './UserTable';
import { gql } from 'graphql-tag';

const QUERY_LIST_USERS = gql`
  query {
    getUsers {
      name
      id
      email
      cpf
    }
  }
`;

const ListUsers = ({openAddUser}) => (
  <Query query={QUERY_LIST_USERS}>
    {(obj) => {
      let { loading, error, data} = obj
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (<UserTable openAddUser={openAddUser} data={data.getUsers} />);
      }
    }
  </Query>
)

export default ListUsers