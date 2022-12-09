import axios from "axios";
import authHeader from "../../../services/auth-header"; 
const API_URL = 'http://localhost:5000/api/admin';

export default class AdminService  {
   getUsers(){
    return axios.get(API_URL+"/getUsers", { headers: authHeader() } )
  }
  getUserById(id){
    return axios.get(API_URL+"/getUserById?id="+id, { headers: authHeader() } )
  }
  getUserNumbers(){
    return axios.get(API_URL+"/NumbersOfUsers", { headers: authHeader() } )
  }

}
