import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./global.css";
import Auth0ProviderNavigation from "./auth0/Auth0ProviderNavigation.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderNavigation>
          <App />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderNavigation>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
