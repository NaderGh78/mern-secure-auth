import axios from "axios";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3001"
  : "";

/*===========================================*/

const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default request; 