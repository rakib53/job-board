import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
