import React from 'react'
import { Table } from 'semantic-ui-react'

const UserItemTable = ({item}) => (
  <Table.Row>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.cpf || ''}</Table.Cell>
          <Table.Cell>{item.email || ''}</Table.Cell>
</Table.Row>
)

export default UserItemTable