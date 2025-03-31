import { hydrateRoot } from "hono/jsx/dom/client";
import { App } from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

hydrateRoot(root, <App />);
