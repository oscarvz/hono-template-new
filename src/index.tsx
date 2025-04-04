import { Hono } from "hono";
import { renderer } from "./renderer";
import { App } from "./App";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<App />);
});

export default app;
