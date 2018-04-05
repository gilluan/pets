import React from 'react';
import { Query } from 'react-apollo';
import UserTable from './UserTable';
import QUERY_LIST_USERS from '/.UserQueries';

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