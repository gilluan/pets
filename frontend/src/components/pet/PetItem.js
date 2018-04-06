import React from 'react';
import { Table } from 'semantic-ui-react';

const PetItem = ({item}) => (
  <Table.Row>
    <Table.Cell>{item.name}</Table.Cell>
  </Table.Row>
);

export default PetItem;
