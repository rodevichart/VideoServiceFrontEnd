import http from "./httpService";
import { userApiEndPoint } from "../config.json";
import { decodeJwt, tokenKey } from "./jwtService";

export function register(user) {
  return http.post(userApiEndPoint + "/registration", user);
}

export async function login(userName, password) {
  const { data: jwt } = await http.post(userApiEndPoint + "/authenticate", {
    userName,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return decodeJwt(jwt);
  } catch (ex) {
    return null;
  }
}
