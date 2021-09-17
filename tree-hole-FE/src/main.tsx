import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProviders } from "./context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Router>
        <App />
      </Router>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
