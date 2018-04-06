import React from 'react';
import { PetList } from '../components/pet/index';
import { withRouter } from 'react-router-dom';

class UserPetsListPage extends React.Component {

  render() {
    let userId = this.props.match.id;
    return (
      <PetList id={userId} />
    );
  }
}

export default withRouter(UserPetsListPage);
