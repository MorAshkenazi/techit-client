import axios from "axios";
import { Product } from "../interfaces/Product";
import _ from "lodash";

const api: string = process.env.REACT_APP_API || "";

// get all products
export const getAllProducts = (): Promise<any> =>
  axios.get(`${api}products`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

// add new product
export const addProduct = (newProduct: Product): Promise<any> =>
  axios.post(`${api}products`, newProduct, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

// edit product
export const editProduct = (product: Product): Promise<any> => {
  let body = _.omit(product, ["_id"]);
  return axios.put(`${api}products/${product._id}`, body, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
};

// get product
export const getProduct = (id: string): Promise<any> =>
  axios.get(`${api}products/${id}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });

// delete product
export const deleteProduct = (id: string): Promise<any> =>
  axios.delete(`${api}products/${id}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
  });
