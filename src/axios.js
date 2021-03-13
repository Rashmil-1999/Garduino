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

  getSensorData = async (uRL, postData) => {
    try {
      const resp = await this.instance.post(uRL, postData);
      console.log(resp);
      // const data = await resp.json();
      const data = resp.data;
      console.log(data);
      if (data.status === "success") {
        console.log("success");
        return data;
      }
    } catch (e) {
      if (e.response && e.response.data) {
        return e;
      }
    }
  };
}

export default new Axios();
