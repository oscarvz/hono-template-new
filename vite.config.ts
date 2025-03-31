import { cloudflare } from "@cloudflare/vite-plugin";
import build from "@hono/vite-build/cloudflare-workers";
import { defineConfig } from "vite";
import ssrHotReload from "vite-plugin-ssr-hot-reload";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      publicDir: "./src/public",
      build: {
        manifest: true,
        outDir: "./public",
        copyPublicDir: false,
        rollupOptions: { input: { client: "./src/client.tsx" } },
      },
    };
  }

  return {
    plugins: [ssrHotReload(), cloudflare(), build()],
  };
});
