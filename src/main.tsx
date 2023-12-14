import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "virtual:uno.css";
import "@unocss/reset/eric-meyer.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
