import React from 'react';
import { withRouter, Route } from "react-router-dom";
import UserListPage from "./UserListPage"
import UserPage from "./UserPage";
import Switch from "react-router-dom/Switch";
import { connect } from "react-redux";
import PrivateRoute from '../components/PrivateRoute';

const App = props => {
  const { dispatch } = props;
  return (
    <div>
      <Switch>
	      <PrivateRoute path="/add-user" component={UserPage} /> 
        <PrivateRoute path="/users" component={UserListPage} />
      </Switch>
    </div>
  );
};

export default App;
