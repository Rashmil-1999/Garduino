import * as jwt from "jwt-decode";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const readToken = (token) => {
  return jwt(token);
};

export const getToken = () => {
  return cookies.get(process.env.REACT_APP_USER_TOKEN);
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const userId = () => {
  const tokenInfo = readToken(getToken());
  if (tokenInfo && tokenInfo.sub) {
    return tokenInfo.sub;
  }
  return null;
};

export const roles = (token) => {
  const tokenInfo = readToken(token);
  if (tokenInfo && tokenInfo.roles) {
    return tokenInfo.roles;
  }
  return null;
};

const _isExpired = (exp) => {
  return Date.now() / 1000 > exp;
};

export const isExpired = (token) => {
  const tokenInfo = readToken(token);
  if (tokenInfo && tokenInfo.exp && !_isExpired(tokenInfo.exp)) {
    return false;
  }
  return true;
};
