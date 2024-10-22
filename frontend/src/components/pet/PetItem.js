import React from 'react';
import { Table, Button } from 'semantic-ui-react';


const PetItem = ({item}) => (
  <Table.Row>
    <Table.Cell>{item.nome}</Table.Cell>
    <Table.Cell>{item.raca}</Table.Cell>
    <Table.Cell>{item.especie}</Table.Cell>
    <Table.Cell><Button icon="edit" /></Table.Cell>
    <Table.Cell><Button icon="remove" /></Table.Cell>
  </Table.Row>
);

export default PetItem;
