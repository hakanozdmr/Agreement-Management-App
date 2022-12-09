import React, { useContext } from 'react'
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Navbar} from 'react-bootstrap';
import AuthService from '../services/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"; 
export default function SingedIn() {
  const navigate = useNavigate()

  const { loading, error, dispatch } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem('user'));
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      const res = await AuthService.logout()
      console.log(user.username)
      dispatch({ type: "LOGOUT", payload: res });
      navigate("/login")
      navigate(0)
    } catch (err) {
      console.log(err.response.data)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return ( user?
    <div >
        <Navbar.Collapse className="justify-content-end" >
        <div className="vr" />
        <Image className='ms-2' roundedCircle style={{ width: '5%' }} src='https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png' ></Image>
        <NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to={`/profile`}>Bilgilerim</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleClick}>
                Çıkış Yap 
              </NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
    </div>:null
  )
}
