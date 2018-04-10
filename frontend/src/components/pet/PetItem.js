import React from 'react'
import { Table, Button, Popup} from 'semantic-ui-react'

const PetItem = ({item}) => (
  <Table.Row>
    <Table.Cell>{item.nome}</Table.Cell>
    <Table.Cell>{item.raca}</Table.Cell>
    <Table.Cell>{item.especie}</Table.Cell>
    <Table.Cell>
      <Popup
        trigger={<Button icon='edit' inverted color='blue' />}
        content='Editar Pet'
      />
      <Popup
        trigger={<Button icon='remove' inverted color='red' />}
        content='Excluir Pet'
      />
    </Table.Cell>
  </Table.Row>
)

export default PetItem
