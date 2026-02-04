import axios from "axios";

const API = axios.create({
  baseURL: "http://3.21.240.29:8080/buses/schedules",
});

export default API;
