import React from "react";
import ReactDOM from "react-dom/client";
import "assets/css/index.css";
import App from "./layouts/App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
