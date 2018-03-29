import React from 'react';
import { withRouter } from 'react-router-dom'
import UserForm from '../components/user/UserForm';
import { ApolloClient } from 'apollo-client';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react';

const UserPage = props => (
  <div className="addUserForm">
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <UserForm {...props} />
      </Grid.Column>
    </Grid>
  </div>

);

export default withRouter(UserPage);
