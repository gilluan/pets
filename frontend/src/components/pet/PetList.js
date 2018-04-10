import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'semantic-ui-react';
import gql from 'graphql-tag';
import PetsTable from './PetsTable';

const QUERY_PETS_LIST = gql`
  query getPetsByUser($id: String!) {
    getPetsByUser(id: $id) {
      id
      nome
      raca
      especie
    }
  }
`;

const PetList = ({id, openEditPet}) => (
  <Query query={QUERY_PETS_LIST} variables={{ id }}>
    {(obj) => {
        let { loading, error, data } = obj;
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (<PetsTable data={data.getPetsByUser} openEditPet={openEditPet} />);
      }
    }
  </Query>
);

export { PetList };
