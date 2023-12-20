export function getApiUrl() {
  const apiUrl = process.env.NODE_ENV === "production" ? 'https://songlyrics-v58f.onrender.com' : 'http://localhost:3000';

  return apiUrl;
}
