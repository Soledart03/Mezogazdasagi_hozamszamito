import axios from "axios";
export const api = axios.create({
  baseURL: "http://10.168.192.35:3000",
});
