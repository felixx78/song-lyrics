import axios from "axios";

const isLocalhost = location.hostname === "localhost";

const apiClient = axios.create({
  baseURL: isLocalhost
    ? `http://localhost:3000`
    : `${location.protocol}//${location.hostname}`,
});

export default apiClient;
