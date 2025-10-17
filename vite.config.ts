import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      Aos: "aos/dist/aos.js",
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
