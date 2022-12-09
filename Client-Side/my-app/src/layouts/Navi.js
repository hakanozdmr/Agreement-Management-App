import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/userService';
import SingedIn from './SingedIn';
import SingedOut from './SingedOut';
export default function Navi() {
  const [isAuthenticated, setisAuthenticated] = useState(true)
  const [isAdmin, setisAdmin] = useState(false)
  const navigate = useNavigate()

 

  const user = JSON.parse(localStorage.getItem('user'));
  
      useEffect(() => {
      if(user===null){
          setisAuthenticated(false)
          navigate("/login")
          navigate(0)
      }
    }, [])
      useEffect(() => {
        if(user.role==='ADMIN'){
            setisAdmin(true)

        }
      }, [])
      
  
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Sözleşme Yönetim Uygulaması</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            {isAdmin ? 
            <Nav className="me-auto">
              <Nav.Link href="/admin">Admin</Nav.Link>
            </Nav> : null}
          </Navbar.Collapse>
          {isAuthenticated ? <SingedIn /> : null}
        </Container>
      </Navbar>
    </div>
  )
}
