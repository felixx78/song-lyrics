import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SkeletonTheme baseColor="#292940" highlightColor="#1f1f36">
          <Analytics />
          <App />
        </SkeletonTheme>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
