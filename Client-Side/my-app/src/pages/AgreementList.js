import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import UserService from '../services/userService';
import AgreementService from '../services/agreementService';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Navi from '../layouts/Navi';
import { Container } from 'react-bootstrap';
import authService from '../services/authService';
import useFetch from '../hooks/UseFetch';
import axios from 'axios';
import authHeader from '../services/auth-header';
import {
    faHotel,
    faArrowDownWideShort
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AgreementList() {

    // state = {
    //     currentUser: authService.getCurrentUser()
    //   };
    //   const { currentUser } = this.state;
    let user = authService.getCurrentUser()
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        console.log(value)
        const API_URL = "http://localhost:5000/api/deleteAgreement?id=" + value
        const res = await axios.delete(API_URL, { headers: authHeader() })
        navigate(0)
    };
    const handlePassive = async (e) => {
        var b = window.confirm("Sözleşme Pasif olsun mu ?");
        if (b === true) {
            let value = e.target.value;
            let userId = authService.getCurrentUser()
            console.log(userId.id)
            let agreementService = new AgreementService()
            const res = await agreementService.setAgreementPassive(value, userId.id)
            console.log(res)
            navigate(0)
        } else {
            navigate(0)
        }

    }
    const handleActive = async (e) => {
        var b = window.confirm("Sözleşme Aktif olsun mu ?");
        if (b === true) {
            let value = e.target.value;
            let userId = authService.getCurrentUser()
            console.log(userId.id)
            let agreementService = new AgreementService()
            const res = await agreementService.setAgreementActive(value, userId.id)
            console.log(res)
            navigate(0)
        } else {
            navigate(0)
        }

    }

    const handleUpdate = async (e) => {

        this.props.history.push("")
    }
    const buttonStyle = {
        background: "linear-gradient(to right, #14163c 0%, #03217b 79%)",
        textTtransform: "uppercase",
        letterSpacing: "0.2rem",
        height: "3rem",
        border: "none",
        color: "white",
        borderRadius: "2rem",
        cursor: "pointer",
        margin: "2rem 0 0rem 0",
    };
    // const [getAgreementswithUser, setgetAgreementswithUser] = useState([])
    const [agreements, setAgreements] = useState([])
    const [sortedAgreements, setsortedAgreements] = useState([])
    const [showAgreements, setshowAgreements] = useState({
        visible:true,
        visibleDesc:false
    })
    // useEffect(() => {
    //     let userService = new UserService()
    //     userService.getUsers().then(result => setUsers(result.data.data))
    // }, [])
    // useEffect(() => {
    //     let agreementService = new AgreementService()
    //     agreementService.getAgreementswithUser().then(result => setgetAgreementswithUser(result.data.data))
    // }, [])
    useEffect(() => {
        let agreementService = new AgreementService()
        agreementService.getAgreementByUserId(user.id).then(result => setAgreements(result.data.data))
    }, [])
    useEffect(() => {
        let agreementService = new AgreementService()
        agreementService.getAgreementSorted(user.id).then(result => setsortedAgreements(result.data.data))
    }, [])
    const handleAgreement =  (e) => {
        e.preventDefault()
        setshowAgreements({visible : true , visibleDesc : false})
    }
    const handleAgreement2 =  (e) => {
        setshowAgreements({visible : false ,visibleDesc : true })
    }
    console.log(showAgreements)
    return (
        <div>
            <Container>
                <Navi />
                <div className="d-grid gap-2 m-3">
                    <Button variant="primary" size="lg" as={NavLink} to={`/addnewagreements`} style={buttonStyle} >
                        Yeni Sözleşme Ekle
                    </Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> <a onClick={handleAgreement}> # <FontAwesomeIcon icon={faArrowDownWideShort} /></a> </th>
                            <th>Agreement Name</th>
                            <th>Agreement Total Price</th>
                            <th>agreement WithdrawalFee</th>
                            <th>Description</th>
                            <th>Customer Id</th>
                            <th>Info</th>
                            <th>Update</th>
                            <th><a onClick={handleAgreement2}> Status <FontAwesomeIcon icon={faArrowDownWideShort} /></a></th>
                        </tr>
                    </thead>
                    <tbody>
                        { showAgreements.visible === true && showAgreements.visibleDesc === false ? 
                            agreements.map(agreement => (
                                <tr key={agreement.id} >
                                    <td >{agreement.id}</td>
                                    <td >{agreement.agreementName}</td>
                                    <td>{agreement.agreementTotalPrice}</td>
                                    <td>{agreement.agreementWithdrawalFee}</td>
                                    <td>{agreement.description}</td>
                                    <td>{agreement.user.name}</td>
                                    <td><Button as={NavLink} to={`/agreements/detail/${agreement.id}`} variant="info">Info</Button>{' '}</td>
                                    <td><Button as={NavLink} to={`/agreements/update/${agreement.id}`} variant="warning">Update</Button>{' '}</td>
                                    {agreement.active === true ?
                                        <td><Button variant="primary" onClick={handlePassive} value={agreement.id} >Active</Button>{' '}</td> :
                                        <td><Button variant="outline-secondary" onClick={handleActive} value={agreement.id} >Passive</Button>{' '}</td>}
                                </tr>
                            ))
                        : sortedAgreements.map(agreement => (
                            <tr key={agreement.id} >
                                <td >{agreement.id}</td>
                                <td >{agreement.agreementName}</td>
                                <td>{agreement.agreementTotalPrice}</td>
                                <td>{agreement.agreementWithdrawalFee}</td>
                                <td>{agreement.description}</td>
                                <td>{agreement.user.name}</td>
                                <td><Button as={NavLink} to={`/agreements/detail/${agreement.id}`} variant="info">Info</Button>{' '}</td>
                                <td><Button as={NavLink} to={`/agreements/update/${agreement.id}`} variant="warning">Update</Button>{' '}</td>
                                {agreement.active === true ?
                                    <td><Button variant="primary" onClick={handlePassive} value={agreement.id} >Active</Button>{' '}</td> :
                                    <td><Button variant="outline-secondary" onClick={handleActive} value={agreement.id} >Passive</Button>{' '}</td>}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
