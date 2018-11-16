import Axios from "axios";
import router from "@/router";
const BudgetManagerAPI = `http://{window.location.hostname}:3001`;

export default {
  user: { authtenticated: false },

  authenticate(context, credentials, redirect) {
    Axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
      .then(({ data: { token } }) => {
        context.$cookie.set("token", token, "1D");
        context.validLogin = true;
        this.user.authtenticated = true;

        if (redirect) {
          router.push(redirect);
        }
      })
      .catch(({ response: { data } }) => {
        context.snackbar = true;
        context.message = data.message;
        this.user.authtenticated = true;
      });
  },

  signup(context, credential, redirect) {
    Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credential)
      .then(({ data: { token } }) => {
        context.$cookie.set("token", token, "1D");
        context.validSignup = true;

        if (redirect) {
          router.push(redirect);
        }
      })
      .catch(({ response: { data } }) => {
        context.snackbar = true;
        context.message = data.message;
      });
  },

  checkAuthentication() {
    const token = document.cookie;

    if (token) {
      this.user.authtenticated = true;
    } else {
      this.user.authtenticated = false;
    }
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get("token")}`;
  }
};
