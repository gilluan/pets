import React from 'react';
import UserList from '../components/user/UserList';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

class UserListPage extends React.Component {

  componentDidMount() {
    let getUsers = async () => {
      let { data: {getUsers: {users} } } = await this.props.getUsers();
      this.props.users = users;
    };

    getUsers();
  }

  render() {
    return (
      <div className="listUser">
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{maxWidth: 450}}>
            <UserList {...this.props} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}

const QUERY = gql`
query {
  getUsers {
    name,
    email,
    sexo
  }
}
`;

export default withRouter(
  graphql(QUERY, {name: 'getUsers'})(UserListPage)
);
