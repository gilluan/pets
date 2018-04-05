import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import UserItemTable from './UserItemTable';

const UserTable = ({data, openAddUser}) => (
      <Table striped>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Cpf</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => (<UserItemTable key={item.id} item={item} />))}
      </Table.Body>
       <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button floated='right' icon labelPosition='left' onClick={openAddUser('large')} primary size='small'>
            <Icon name='user' /> Add User
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
)

export default UserTable