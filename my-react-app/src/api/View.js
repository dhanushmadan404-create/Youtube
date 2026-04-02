import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API;

class View {
  constructor() {
    this.api = API_URL;

    this.headers = {
      "Content-Type": "application/json",
    };
  }

  // create view
  createView = async (body) => {
    try {
      const response = await axios.post(
        `${this.api}/view/`,
        body,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get views by video
  getByVideo = async (videoId) => {
    try {
      const response = await axios.get(
        `${this.api}/view/${videoId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  // get views by user
  getByUser = async (userId) => {
    try {
      const response = await axios.get(
        `${this.api}/view/user/${userId}`,
        { headers: this.headers }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const viewApi = new View();
export default viewApi;