import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/unique-handlooms/us-central1/api",
});

export default instance