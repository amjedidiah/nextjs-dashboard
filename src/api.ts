import axios from "axios";

const api = axios.create({
  baseURL: "https://api-test.innoloft.com",
});

export default api;
