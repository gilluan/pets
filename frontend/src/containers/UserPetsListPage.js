import React from 'react';
import { PetList } from '../components/pet/index';
import { withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

class UserPetsListPage extends React.Component {

  render() {
    let userId = this.props.match.params.id;
    return (
      <div className='petsUserList'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <PetList id={userId} />
        </Grid>
      </div>
    );
  }
}

export default withRouter(UserPetsListPage);
