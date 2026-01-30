import axios from "axios";

const API = axios.create({
  baseURL: "https://buzzo-5.onrender.com/buses/schedules",
});

export default API;
