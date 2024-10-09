import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Web3Provider from "./provider/Web3Provider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <HashRouter>
        <App />
      </HashRouter>
    </Web3Provider>
  </StrictMode>
);
