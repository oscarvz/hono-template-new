import { hydrateRoot } from "hono/jsx/dom/client";
import { App } from "./App";


const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

hydrateRoot(root, <App />);
