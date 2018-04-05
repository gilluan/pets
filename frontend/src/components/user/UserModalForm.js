import React from 'react'
import { Mutation } from 'react-apollo';
import UserForm from './UserForm';
import { QUERY_LIST_USERS, SAVE_USER } from '/.UserQueries'
import { Modal } from 'semantic-ui-react';


const updateUsersList = (cache, { data: { createUser } }) => {
    const { getUsers } = cache.readQuery({ query: QUERY_LIST_USERS }) || [];
    cache.writeQuery({
      query: QUERY_LIST_USERS,
      data: {getUsers: [...getUsers, createUser] }
    });
}




const UserModalForm = ({open, size, onClose}) => (
     <Mutation
              mutation={SAVE_USER}
              update={updateUsersList}>
          {(createUser => (
            <Modal size='small' open={open} onClose={onClose}>
               <UserForm createUser={createUser}/>
            </Modal>
          ))}
        </Mutation>
)

export default UserModalForm