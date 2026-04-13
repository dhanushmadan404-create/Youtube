import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

class User {
  constructor() {
    this.api = API_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  // create user
  userCreate = async (body) => {
    console.log(body);
    const response = await axios.post(`${this.api}/user/`, body, {
      headers: this.headers,
    });
    return response;
  };

  // get user by email
  getByEmail = async (email) => {
    const response = await axios.get(`${this.api}/user/${email}`, {
      headers: this.headers,
    });
    return response;
  };

  // get user by User_id
  getByUserId = async (Id) => {
    const response = await axios.get(`${this.api}/user/id/${Id}`, {
      headers: this.headers,
    });
    return response;
  };

  // login user
  login = async (body) => {
    const response = await axios.post(`${this.api}/user/login`, body, {
      headers: this.headers,
    });
    return response;
  };

  // update user
  updateUser = async (userId, body) => {
    const response = await axios.put(
      `${this.api}/user/update/${userId}`,
      body,
      { headers: this.headers },
    );
    return response;
  };
  // get me
  me = async () => {
    const response = await axios.get(`${this.api}/user/me`, {
      headers: this.headers,
    });
    return response;
  };
}

const userApi = new User();
export default userApi;
