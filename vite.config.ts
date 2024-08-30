import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Add server configuration to enable better debugging
  server: {
    port: 3000, // Set the port you want to use
    open: true, // Automatically open the browser on server start
  },
  build: {
    target: "esnext", // Ensure compatibility with modern browsers
  },
});
