import axios from "axios";

export default axios.create({
  baseURL: "https://djangoui.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});