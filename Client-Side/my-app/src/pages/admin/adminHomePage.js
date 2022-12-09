import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { ButtonGroup, Container } from 'react-bootstrap';
import AdminNav from './layouts/Navbar';
import UsersPage from './customersPages/usersPage';
import buttonStyle from './layouts/buttonStyle'
import Agreements from '../../components/Agreements';

export default function AdminHomePage() {


    const [Uservisiblty, setUservisiblty] = useState(true)
    const [Agreementvisiblty, setAgreementvisiblty] = useState(false)
    const changeUserVisibility = async (e) => {
        setUservisiblty(!Uservisiblty)
    } 
    const changeAgreementVisibility = async (e) => {
        setAgreementvisiblty(!Agreementvisiblty)
    } 
    return (
        <div>
            <Container>
                <AdminNav/>
                <Button style={buttonStyle} onClick={changeUserVisibility} className="m-3">Users</Button>{' '}
                <Button style={buttonStyle} onClick={changeAgreementVisibility} className="m-3">Agreements</Button>{' '}
                {Uservisiblty && Agreementvisiblty===false ? <UsersPage/> : <Agreements/>}
                {/* {Agreementvisiblty ?<Agreements/> : null} */}
            </Container>
        </div>
    )
}
