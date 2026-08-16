import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GitHubThemeProvider } from "./theme/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GitHubThemeProvider>
      <BrowserRouter basename="/portfolio">
        <App />
      </BrowserRouter>
    </GitHubThemeProvider>
  </React.StrictMode>
);
