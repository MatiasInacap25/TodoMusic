import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </React.StrictMode>
);
