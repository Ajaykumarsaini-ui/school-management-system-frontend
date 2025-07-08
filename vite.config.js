import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    include: ['react-csv'], // 👈 Add this to prevent "Outdated Optimize Dep" 504
  },
});
