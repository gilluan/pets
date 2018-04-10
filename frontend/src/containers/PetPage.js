import React from 'react';
import { withRouter } from 'react-router-dom';
import { PetUserList, PetModalForm } from '../components/pet/index';
import { Card } from 'semantic-ui-react';

const redirectPets = (user, history) => history.push(`/user/${user.id}/pets`);

class PetPage extends React.Component {

  //TODO
  state = { open: false, size: 'medium' }
  show = (user) => () => this.setState({ user, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, size, user } = this.state
    const history = this.props.history;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            Selecione um usuário
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {/*Adicionar o filtro*/}
          {/*<h2>Lista de Usuarios</h2>*/}
          <PetUserList openAddPet={(user) => this.show(user)} openUserPetsList={(user) => redirectPets(user, history)}/>
          <PetModalForm open={open} size={size} onClose={this.close} user={user} history={history} />
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(PetPage);
