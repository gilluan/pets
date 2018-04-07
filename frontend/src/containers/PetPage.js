import React from 'react';
import { withRouter } from 'react-router-dom';
import PetForm from '../components/pet/PetForm';
import { Button, Table, Grid, Pagination, Icon, Modal, Container, Card } from 'semantic-ui-react';
import { Query, Mutation } from 'react-apollo';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

const QUERY_LIST_USERS = gql`
  query {
    getUsers {
      name
      id
      email
      cpf
    }
  }
`;

const ItemTable = ({item, openAddPet}) => (
  <Table.Row>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.cpf || ''}</Table.Cell>
          <Table.Cell>{item.email || ''}</Table.Cell>
          <Table.Cell>
            <Button animated onClick={openAddPet(item)}>
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name='right arrow' />
              </Button.Content>
            </Button>
          </Table.Cell>
</Table.Row>
);


const UserTable = ({data, openAddPet}) => (
      <Table striped>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Cpf</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => (<ItemTable openAddPet={openAddPet} key={item.id} item={item} />))}
      </Table.Body>
       <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
);

const ListUsers = ({openAddPet}) => (
  <Query query={QUERY_LIST_USERS}>
    {(obj) => {
      let { loading, error, data} = obj
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (<UserTable openAddPet={openAddPet} data={data.getUsers} />);
      }
    }
  </Query>
);


const SAVE_PET = gql`
mutation createPet(
  $nome: String!,
  $especie: String,
  $cor: String,
  $raca: String,
  $sexo: String,
  $peso: Float,
  $nascimento: String,
  $criado: String,
  $ativo: Boolean,
  $comportamento: [String],
  $observacoes: String,
  $idUsuario: ID!
) {
  createPet(nome: $nome, especie: $especie, cor: $cor, raca: $raca,
    sexo: $sexo, peso: $peso, nascimento: $nascimento, criado: $criado, ativo: $ativo,
   comportamento: $comportamento, observacoes: $observacoes, usuario: $idUsuario) {
      nome
    }
}
`;

const redirectPets = (user, history) => history.push(`/user/${user.id}/pets`);

const ModalForm = ({open, size, onClose, user, history}) => (

     <Mutation
      mutation={SAVE_PET}
      update={() => redirectPets(user, history)}
     >
          {(createPet => (
            <Modal size='small' open={open} onClose={onClose}>
               <PetForm createPet={createPet} user={user} />
            </Modal>
          ))}

      </Mutation>
);


class PetPage extends React.Component {

  //TODO
  state = { open: false, size: 'medium' }
  show = (user) => () => this.setState({ user, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, size, user } = this.state
    const history = this.props.history;
    return (
      <span>
        {/*Adicionar o filtro*/}
        {/*<h2>Lista de Usuarios</h2>*/}
        <ListUsers openAddPet={(user) => this.show(user)}/>
        <ModalForm open={open} size={size} onClose={this.close} user={user} history={history} />
      </span>
    );
  }
}

export default withRouter(PetPage);
