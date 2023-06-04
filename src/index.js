import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import "./App.css";
import AppRouter from "./AppRouting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={AppRouter} /> */}
    <AppRouter />
    {/* <App /> */}
  </React.StrictMode>
);
