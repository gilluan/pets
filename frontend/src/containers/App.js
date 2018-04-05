import React from 'react';
import { withRouter, Route } from "react-router-dom";
import UserListPage from "./UserListPage"
import UserPage from "./UserPage";
import Switch from "react-router-dom/Switch";
import { connect } from "react-redux";
import PrivateRoute from '../components/PrivateRoute';
import { Menu } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const App = props => {
  const { dispatch } = props
  return (
    <div>
      <Menu fixed="top" inverted>
            <Container>
                <Menu.Item name='home' onClick={this.handleItemClick} >
                  <Link to="/users">Home</Link>
                </Menu.Item>
                <Menu.Item name='messages' onClick={this.handleItemClick}>
                  <Link to="/users">Usuários</Link>
                </Menu.Item>
                <Menu.Item name='friends' onClick={this.handleItemClick}>
                  <Link to="/pets">Pets</Link>
                </Menu.Item>
              </Container>
            </Menu>
      <Switch>
        <PrivateRoute path="/users" component={UserListPage} />
      </Switch>
    </div>
  )
}

export default App
