import axios from "axios";
const API_URL = "http://localhost:5000/api/user/";
class AuthService {
  login(username, password) {
    console.log(username,password)
    const config = { headers: {"Content-Type":"application/json"}};
    return axios
      .post(API_URL + "login", {
        username,
        password
      },config)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          document.cookie = "accessToken=" + "Bearer "+response.data.accessToken
            console.log(response, document.cookie);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(name, username, email,password) {
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(name)
    return axios.post(API_URL + "registration", {
      name,
      username,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();