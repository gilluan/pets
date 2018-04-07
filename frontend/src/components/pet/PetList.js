import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'semantic-ui-react';
import gql from 'graphql-tag';
import PetsTable from './PetsTable';

let QUERY_PETS_LIST = gql`
  query getPetsByUser($id: String!) {
    getPetsByUser(id: $id) {
      id
      name
    }
  }
`;

let PetList = ({id}) => (
  <Query query={QUERY_PETS_LIST} variables={{ id }}>
    {(obj) => {
        console.log('ID', id, 'OBJ', obj);
        let { loading, error, data } = obj;
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (<PetsTable data={data.getPetsByUser} />);
      }
    }
  </Query>
);

export default PetList;
