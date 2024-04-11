import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.song-lyrics.org"
    : "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": apiUrl,
    },
  },
});
