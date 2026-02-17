import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";
import path from "path";

/*===========================================*/

// access .env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}) 