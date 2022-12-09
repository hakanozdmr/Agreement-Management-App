import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import AuthService from '../../services/authService';
import UserService from '../../services/userService';
import  "./register.css";

function Register() {
  //let { user } = useParams()
    const [user, setUser] = useState({
      email: undefined,
      name:undefined,
      password:undefined, 
      username:undefined
    })
    
  
   // const { loading, error, dispatch } = useContext(AuthContext);
  
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      // setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
     
  const handleClick = async (e) => {
    e.preventDefault();
   
    const res = await AuthService.register(user.name,user.username,user.email,user.password)
    navigate("/login")
    navigate(0)
    
  };
  console.log(user)
  return (
    <div className="cardBody">
    <MainContainer>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
      <Form.Control
          placeholder="name"
          aria-label="name"
          aria-describedby="basic-addon1"
          type="text"
          style={inputStyle}
          onChange={handleChange}
          className="cardInput"
          id="name"
        />
       <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          style={inputStyle}
          onChange={handleChange}
          className="cardInput"
          id="username"
        />
        <Form.Control
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon1"
          type="email"
          style={inputStyle}
          onChange={handleChange}
          className="cardInput"
          id="email"
        />
        <Form.Control
          placeholder="password"
          aria-label="password"
          aria-describedby="basic-addon1"
          type="password"
          style={inputStyle}
          onChange={handleChange}
          className="cardInput"
          id="password"
        />
      </InputContainer>
      <ButtonContainer>
      <Button style={buttonStyle}  onClick={handleClick} >Register</Button>
      <Button style={buttonStyle} as={NavLink} to="/login"  >Go Login Page</Button>
      </ButtonContainer>
      <HorizontalRule />
    </MainContainer>
    </div>
  );
}

const buttonStyle = {
  background: "linear-gradient(to right, #14163c 0%, #03217b 79%)",
  textTransform: "uppercase",
  letterSpacing: "0.2rem",
  width:"65%",
  height: "3rem",
  border: "none",
  color: "white",
  borderRadius: "2rem",
  cursor: "pointer",
  margin: "2rem 0 0rem 0"
};
const inputStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "2rem",
  width: "80%",
  height: "3rem",
  padding: "1rem",
  border: "none",
  outline: "none",
  color: "#3c354e",
  fontSize: "1rem",
  fontWeight: "bold",
  margin: "5px",
};
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 75vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 2rem 0 3rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  margin: 2rem 0 3rem 0;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
`;


const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;





export default Register;
