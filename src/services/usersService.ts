import axios from "axios";
import { User } from "../interfaces/User";
import jwt_decode from "jwt-decode";

const api: string = process.env.REACT_APP_API || "";

// add new user
export const addUser = (newUser: User): Promise<any> =>
  axios.post(`${api}register`, newUser);

// check for existing user login
export const checkUser = (user: User): Promise<any> =>
  axios.post(`${api}login`, user);

// get user detalis
export const getUser = (): Promise<any> =>
  axios.get(`${api}profile`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

// get payload from token
export const getIsAdmin = () => {
  return (jwt_decode(sessionStorage.getItem("token") as string) as any).isAdmin;
};
