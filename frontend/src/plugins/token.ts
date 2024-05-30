import { clear } from "console";
import { jwtDecode, JwtPayload } from "jwt-decode";
export default {
  data: {
    TOKEN_KEY: "access_token",
  },
  setToken: function (token:string) {
    try {
      localStorage.setItem(this.data.TOKEN_KEY, JSON.stringify(token));
      return true;
    } catch (error) {
      return false;
    }
  },
  getTokenFromStorage(){
    return JSON.parse(localStorage.getItem(this.data.TOKEN_KEY)||"{}");
  },
  getAuthorization: function (){
    let tt = this.getTokenType();
    let tv = this.getToken();
    if(!(tt == null || tv == null)){
      return tt.charAt(0).toUpperCase() + tt.slice(1) + " " + tv;
    }
    return null;
  },
  getToken: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.access_token;
    } catch (error) {
      return null;
    }
  },
  getTokenType: function () {
    try {
      let t = this.getTokenFromStorage();
      return t.token_type;
    } catch (error) {
      return null;
    }
  },
  getTokenExpired: function () {
    let t = this.getClaims();
    return t?.exp;
  },
  getClaims: function () {
    try {
      var token = this.getTokenFromStorage();
      if (token&& token !== "") {
        return jwtDecode(token);
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  getProperty: function (name:keyof JwtPayload) {
    var obj = this.getClaims();
    if (obj !== null) {
      return obj[name];
    } else {
      return null;
    }
  },
  clearToken: function () {
    localStorage.removeItem(this.data.TOKEN_KEY);
  }
};