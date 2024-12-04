import React from "react";
import { createRoot } from "react-dom/client"; // Ensure this import is correct
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js"; // Adjust the path as necessary
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);