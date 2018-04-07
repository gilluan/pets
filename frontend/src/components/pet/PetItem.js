import React from 'react';
import { Table } from 'semantic-ui-react';

const PetItem = ({item}) => (
  <Table.Row>
    <Table.Cell>{item.nome}</Table.Cell>
  </Table.Row>
);

export default PetItem;
