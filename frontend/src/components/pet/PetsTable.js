import React from 'react';
import { Table } from 'semantic-ui-react';
import PetItem from './PetItem';

const PetsTable = ({data}) => (
  <Table striped>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map(item => (<PetItem key={item.id} item={item} />))}
    </Table.Body>
  </Table>
);

export default PetsTable;
