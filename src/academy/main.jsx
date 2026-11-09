import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AcademyApp from "./AcademyApp.jsx";
import "./styles/academy.css";

document.documentElement.lang = "es";

createRoot(document.getElementById("academy-root")).render(
  <StrictMode>
    <AcademyApp />
  </StrictMode>,
);
