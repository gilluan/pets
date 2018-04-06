import React from 'react'
import UserList from '../components/user/UserList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import FormikInput from '../shared/FormikInput'
import { withFormik } from 'formik'
import Yup from 'yup'
import { Button, Table, Grid, Pagination, Icon, Modal, Container, Card } from 'semantic-ui-react'
import FormikForm from '../shared/FormikForm'
import UserForm from '../components/user/UserForm';
import ListUsers from '../components/user/ListUsers';
import UserModalForm from '../components/user/UserModalForm';
import { 


  UserItemTable, 
  UserTable,   } from '../components/user/index';
class UserListPage extends React.Component {

  //TODO
  state = { open: false, size: 'medium' }
  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, size } = this.state
    return (
      <span>
        {/*Adicionar o filtro*/}
        {/*<h2>Lista de Usuarios</h2>*/}
        <ListUsers openAddUser={(size) => this.show(size)}/>
        <UserModalForm open={open} size='medium' onClose={this.close}/>
      </span>
    );
  }
}

export default withRouter(UserListPage);
