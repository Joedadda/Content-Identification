import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function serveVerifyIndex(): Plugin {
  return {
    name: "serve-verify-index",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split("?")[0];
        if (path === "/" || path === "/index.html") {
          req.url = "/demo/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [serveVerifyIndex(), react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
});
