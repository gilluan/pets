import React from 'react';
import { PetList } from '../components/pet/index';
import { withRouter } from 'react-router-dom';
import { Grid, Card } from 'semantic-ui-react';

class UserPetsListPage extends React.Component {

  render() {
    let userId = this.props.match.params.id;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            Pets do Usuário
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <PetList id={userId} />
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(UserPetsListPage);
