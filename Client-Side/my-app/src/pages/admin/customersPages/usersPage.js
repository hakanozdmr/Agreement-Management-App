import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import AdminService from '../service/adminService';

export default function UsersPage() {
   
    // state = {
    //     currentUser: authService.getCurrentUser()
    //   };
    //   const { currentUser } = this.state;
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        console.log(value)
        const API_URL = "http://localhost:5000/api/deleteAgreement?id="+value
        const res = await axios.delete(API_URL,{ headers: authHeader() })
        navigate(0)
      };
   
    const buttonStyle = {
        background: "linear-gradient(to right, #14163c 0%, #03217b 79%)",
        textTtransform: "uppercase",
        letterSpacing: "0.2rem",
        height: "3rem",
        border: "none",
        color: "white",
        borderRadius: "2rem",
        cursor: "pointer",
        margin: "2rem 0 0rem 0"
      };
    const [users, setUsers] = useState([])
    const [getAgreementswithUser, setgetAgreementswithUser] = useState([])
    const [agreements, setAgreements] = useState([])
    const [userNumber, setuserNumber] = useState([])
    useEffect(() => {
        let adminService = new AdminService()
        adminService.getUsers().then(result => setUsers(result.data.data))
        // adminService.getUserNumbers().then(result => setUsers(result.data.data))
    }, [])
    useEffect(() => {
        let adminService = new AdminService()
        let res = adminService.getUserNumbers().then(result => setuserNumber(result.data.message))
    }, [])
    return (
        <div>
                
                <Table striped bordered hover >
                    <thead>
                    <b className="m-3" >{userNumber}</b>
                        <tr>
                            <th>#</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(customer => (
                                <tr key={customer.id} >
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td><Button as={NavLink} to={`users/${customer.id}`} variant="info">Info</Button>{' '}</td>
                                    <td><Button variant="warning"  >Update</Button>{' '}</td>
                                    <td><Button onClick={handleDelete} value={agreements.id} variant="danger">Delete</Button>{' '}</td>
                                </tr>

                            ))
                        }

                    </tbody>
                </Table>
        </div>
    )
}
