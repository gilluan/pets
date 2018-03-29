import React from 'react';
import { List } from 'semantic-ui-react';

let UserList = props => {
  let { users } = props;
  let userMappedToList = users.map(u => (
    <List.Item>
      <List.Content>
        <List.Header as='a'>{u.name}</List.Header>
        <List.Description>{u.email} - {u.sexo}</List.Description>
      </List.Content>
    </List.Item>
  ));
  return (
    <List>
      <h2>LLLL</h2>
      {userMappedToList}
    </List>
);
};

export default UserList;
