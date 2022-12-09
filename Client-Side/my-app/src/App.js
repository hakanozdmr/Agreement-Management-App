
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navi from './layouts/Navi';
import AgreementList from './pages/AgreementList';
import Container from 'react-bootstrap/esm/Container';
import Dashboard from './layouts/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import AgreementDetail from './pages/AgreementDetail';
import Login from './pages/Login/Login';

import Register from './pages/Register/Register';
import FileUploadPage from './components/FileUploadPage';
import { Component } from 'react';
import AuthService from "./services/authService";
import Loggin from './pages/Loggin';
import Profile from './pages/Profile';
import AgreementAdd from './pages/addAgreement/AgreementAdd';
import AdminHomePage from './pages/admin/adminHomePage';
import UserDetail from './pages/admin/customersPages/UserDetail';
import AgreementUpdate from './pages/updateAgreement/AgreementUpdate';
import UploadFiles from './components/UploadFiles';
import UsersPage from './pages/admin/customersPages/usersPage';
import Users from './pages/admin/customersPages/Users';


class App extends Component{
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render(){
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<AgreementList />} />
            <Route path='/agreements' element={<AgreementList />} />
            <Route path='/agreements/detail/:id' element={<AgreementDetail />} />
            <Route path='/agreements/update/:id' element={<AgreementUpdate />} />
            <Route path='/addnewagreements' element={<AgreementAdd />} />
            <Route path='/uf' element={<UploadFiles />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/fu' element={<FileUploadPage />} />
            <Route path='/loggin' element={<Loggin />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin' element={<AdminHomePage />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/users/:id' element={<UserDetail />} />
            {/* <Route path='/deneme' element={<Deneme />} /> */}

          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
