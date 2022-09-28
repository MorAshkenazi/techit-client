import axios from "axios";
import { Product } from "../interfaces/Product";
import _ from "lodash";

const api: string = process.env.REACT_APP_API || "";

// get user cart
export const getUserCart = (): Promise<any> =>
  axios.get(`${api}carts`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

// add to user cart
export const addToUserCart = (product: Product): Promise<any> => {
  let body = _.omit(product, ["_id", "__v"]);
  return axios.post(`${api}carts`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};
