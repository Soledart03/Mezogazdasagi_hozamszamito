import axios from "axios";
export const api = axios.create({
  baseURL: "http://10.168.193.129:3000",
});
