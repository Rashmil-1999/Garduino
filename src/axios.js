import axios from "axios";
import Cookies from "universal-cookie";

class Axios {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_AUTHENTICATE,
      responseType: "json",
      crossDomain: true,
    });
  }

  authenticate = (uRL, data) => {
    return new Promise((resolve, reject) => {
      this.instance
        .post(uRL, data)
        .then((resp) => {
          if (resp.data.status === "success") {
            const cookie = new Cookies();
            cookie.set(process.env.REACT_APP_USER_TOKEN, resp.data.user.token, {
              path: "/",
              domain: process.env.REACT_APP_DOMAIN,
            });
            resolve(resp.data);
          }
          reject(new Error(resp.data.message));
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject(new Error(error));
          }
        });
    });
  };

  getSensorData = (uRL, data) => {
    return new Promise((resolve, reject) => {
      this.instance
        .post(uRL, data)
        .then((resp) => {
          if (resp.status === "success") {
            resolve(resp.data);
          }
          reject(new Error(resp.message));
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            reject(error.response.data);
          } else {
            reject(new Error(error));
          }
        });
    });
  };
}

export default new Axios();
