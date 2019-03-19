import jwtDecode from "jwt-decode";

export const tokenKey = "token";

export function getJwt() {
  const item = localStorage.getItem(tokenKey);
  console.log(item);
  return item;
}

export function decodeJwt(jwt) {
  return jwtDecode(jwt);
}

export default {
  getJwt,
  decodeJwt,
  tokenKey
};
