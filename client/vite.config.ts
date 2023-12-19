import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiUrl = process.env.NODE_ENV === "production" ? "https://songlyrics-lxgf.onrender.com/" : "http://localhost:3000/";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: apiUrl,
        changeOrigin: true,
      },
    }, 
  },
  plugins: [react()],
});
