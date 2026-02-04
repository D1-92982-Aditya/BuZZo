import axios from "axios";

const API = axios.create({
  baseURL: "/api/buses/schedules",
});

export default API;
