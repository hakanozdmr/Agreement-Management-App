import React, { Component } from 'react'
import AuthService from '../services/authService';
import { Button, Card, Container } from 'react-bootstrap'
import { NavLink, useParams } from 'react-router-dom'
import Navi from '../layouts/Navi'

export default class Profile extends Component {
    state = {
        currentUser: AuthService.getCurrentUser()
      };
  render() {
    const { currentUser } = this.state;
    console.log(currentUser)
    return (
      <Container>
      <Navi/>
      <Card className="text-center mt-3">
          <Card.Header>Agreement Id :{currentUser.id}</Card.Header>
          <Card.Body>
              <Card.Title>User Name :{currentUser.name}</Card.Title>
              <Card.Title className='bold'>
                  User Email :{currentUser.email}
              </Card.Title>
              <Card.Title>
                  User Username :{currentUser.username}
              </Card.Title>
              <Card.Title>
              User Password :{currentUser.password}
              </Card.Title>
              <Card.Title>
              User Role :{currentUser.role}
              </Card.Title>
              <Card.Title>
                 {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </Card.Title>
              <Button variant="primary" as={NavLink} to={`/agreements`} >Go Home</Button>
          </Card.Body>
          <Card.Footer className="text-muted"> 
          {/* {agreement.map(user => <div>{user.name}</div>)} */}
          </Card.Footer>
      </Card>
      </Container>
    )
  }
}
