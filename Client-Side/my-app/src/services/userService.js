import axios from "axios";

import authHeader from "./auth-header";
const API_URL = 'http://localhost:5000/api/users';

export default class UserService  {
   getUsers(){
    return axios.get(API_URL, { headers: authHeader() } )
  }
  getUserswithAgreement(){
    return axios.get("http://localhost:5000/api/getUsers",{ headers: authHeader() })
  }
  addUser(user){
    return axios.post("http://localhost:5000/api/user/registration",user)
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}
