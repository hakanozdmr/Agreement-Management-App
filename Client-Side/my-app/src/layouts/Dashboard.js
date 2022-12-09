import React from 'react'
import AgreementList from '../pages/AgreementList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import AgreementDetail from '../pages/AgreementDetail';
import Navi from './Navi';
import { Container } from 'react-bootstrap';
export default function Dashboard() {
  return (
    <div>
      
      <Container>
        <AgreementList />
      </Container>
    </div>
  )
}
