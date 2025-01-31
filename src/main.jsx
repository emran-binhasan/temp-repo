import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import Cursor from "./components/Cursor";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Router}>
      <Cursor /> {/* Now inside RouterProvider */}
    </RouterProvider>
  </StrictMode>
);
