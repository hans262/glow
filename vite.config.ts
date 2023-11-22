import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

// console.log(process.env.VITE_HTTPS)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/glow/" : "/",
  server: {
    port: 1234,
    // https: {
    //   //需要本地自签证书
    //   key: readFileSync("./public/localhost+1-key.pem"),
    //   cert: readFileSync("./public/localhost+1.pem"),
    // },
    open: true,
  },
  build: {
    sourcemap: false,
  },
});
