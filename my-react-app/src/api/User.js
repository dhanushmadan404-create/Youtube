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
    try {
      const response = await axios.post(`${this.api}/user/`, body, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get user by email
  getByEmail = async (email) => {
    try {
      const response = await axios.get(`${this.api}/user/${email}`, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

    // get user by User_id
  getByUserId = async (Id) => {
    try {
      const response = await axios.get(`${this.api}/user/id/${Id}`, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // login user
  login = async (body) => {
    try {
      const response = await axios.post(`${this.api}/user/login`, body, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  // update user
  updateUser = async (userId, body) => {
    try {
      const response = await axios.put(
        `${this.api}/user/update/${userId}`,
        body,
        { headers: this.headers },
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  // get me
  me = async () => {
    try {
      const response = await axios.get(`${this.api}/user/me`, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const userApi = new User();
export default userApi;
