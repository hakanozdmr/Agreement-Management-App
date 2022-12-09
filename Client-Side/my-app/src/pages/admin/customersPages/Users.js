import React from 'react'
import { Container } from 'react-bootstrap'
import AdminNav from '../layouts/Navbar'
import UsersPage from './usersPage'

export default function Users() {
  return (
    <div>
        <Container>
            <AdminNav></AdminNav>
            <UsersPage></UsersPage>
        </Container>
    </div>
  )
}
