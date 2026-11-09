import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const rootPage = fileURLToPath(new URL("./index.html", import.meta.url));
const academyPage = fileURLToPath(new URL("./academy/index.html", import.meta.url));

function academyPathRewrite(req, _res, next) {
  if (req.url?.split("?")[0] === "/academy") req.url = req.url.replace("/academy", "/academy/index.html");
  next();
}

const academyRoute = {
  name: "academy-route",
  configureServer(server) {
    server.middlewares.use(academyPathRewrite);
  },
  configurePreviewServer(server) {
    server.middlewares.use(academyPathRewrite);
  },
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    academyRoute,
  ],
  build: {
    rollupOptions: {
      input: { main: rootPage, academy: academyPage },
    },
  },
});
