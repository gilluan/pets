import React from 'react';
import { PetList } from '../components/pet/index';
import { withRouter } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react';
import { PetModalForm } from '../components/pet/index';

class UserPetsListPage extends React.Component {

  state = { open: false, size: 'medium' }
  show = (pet) => this.setState({ pet, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, size, pet } = this.state
    const user = {id: this.props.match.params.id };
    const history = this.props.history;

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            Pets do Usuário
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <PetList id={user.id} openEditPet={(pet) => this.show(pet)} />
          <PetModalForm open={open} size={size} onClose={this.close} pet={pet} history={history} user={user} />
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(UserPetsListPage);
