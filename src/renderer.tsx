import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/src/client.tsx" type="module" />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
});
