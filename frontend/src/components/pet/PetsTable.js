import React from 'react';
import { Table } from 'semantic-ui-react';
import PetItem from './PetItem';

const PetsTable = ({ data , openEditPet}) => (
  <Table striped>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Raca</Table.HeaderCell>
        <Table.HeaderCell>Espécie</Table.HeaderCell>
        <Table.HeaderCell>Operações</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map(item => (<PetItem key={item.id} item={item} openEditPet={openEditPet} />))}
    </Table.Body>
  </Table>
);

export default PetsTable;
