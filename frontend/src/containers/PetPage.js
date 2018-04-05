import React from 'react';
import { withRouter } from 'react-router-dom';
import PetForm from '../components/pet/PetForm';
import { Grid } from 'semantic-ui-react';

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

const ItemTable = ({item}) => (
  <Table.Row>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.cpf || ''}</Table.Cell>
          <Table.Cell>{item.email || ''}</Table.Cell>
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
        {data.map(item => (<ItemTable key={item.id} item={item} />))}
      </Table.Body>
       <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button floated='right' icon labelPosition='left' onClick={openAddPet('large')} primary size='small'>
            <Icon name='user' /> Add User
          </Button>
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
        return (<UserTable openAddUser={openAddUser} data={data.getUsers} />);
      }
    }
  </Query>
);



const PetPage = props => (
  <div className='addPetForm'>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >

    </Grid>
  </div>

);


const ModalForm = ({open, size, onClose, user}) => (

     // <Mutation
     //          mutation={SAVE_PET}
     //          update={updatePetList}>
     //      {(createUser => (
     //        <Modal size='small' open={open} onClose={onClose}>
     //           <UserForm createUser={createUser}/>
     //        </Modal>
     //      ))}
     //
     //    </Mutation>
);


class PetPage extends React.Component {

  //TODO
  state = { open: false, size: 'medium' }
  show = (size, user) => () => this.setState({ size, open: true, user })
  close = () => this.setState({ open: false })


  render() {
    const { open, size } = this.state
    return (
      <span>
        {/*Adicionar o filtro*/}
        {/*<h2>Lista de Usuarios</h2>*/}
        <ListUsers openAddPet={(size, user) => this.show(size, user)}/>
        <ModalForm open={open} size={size} onClose={this.close} />
      </span>
    );
  }
}

export default withRouter(PetPage);
