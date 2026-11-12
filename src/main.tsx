import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app/app";
import "./app/globals.css";

const redirect = sessionStorage.getItem("pizza-lab-redirect");
if (redirect) {
  sessionStorage.removeItem("pizza-lab-redirect");
  window.history.replaceState(null, "", redirect);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
