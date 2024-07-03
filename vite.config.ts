import Aos from "aos";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
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
