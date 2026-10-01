import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function prototypeRoutes(): Plugin {
  return {
    name: "prototype-routes",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split("?")[0];
        if (path === "/whatsapp" || path === "/whatsapp/") req.url = "/whatsapp.html";
        if (path === "/extension" || path === "/extension/") req.url = "/demo/index.html";
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [prototypeRoutes(), react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        whatsapp: fileURLToPath(new URL("./whatsapp.html", import.meta.url)),
        extension: fileURLToPath(new URL("./demo/index.html", import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
});
