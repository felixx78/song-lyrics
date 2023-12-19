export function getApiUrl() {
  const apiUrl = import.meta.env.PROD ? 'https://songlyrics-lxgf.onrender.com' : 'http://localhost:3000';

  return apiUrl;
}
