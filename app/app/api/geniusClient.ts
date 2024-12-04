import axios from "axios";

const geniusClient = axios.create({
  baseURL: "https://api.genius.com",
});

geniusClient.interceptors.request.use((config) => {
  config.params = { ...config.params, access_token: process.env.GENIUS_SECRET };
  console.log(config.params);
  return config;
});

geniusClient.interceptors.response.use((response) => response.data.response);

export default geniusClient;
