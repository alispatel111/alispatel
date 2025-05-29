import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["react-icons"],
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
      },
    },
    // Enable asset optimization
    assetsInlineLimit: 4096,
    // Minify output
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimize asset loading
  optimizeDeps: {
    include: ["react", "react-dom", "react-icons"],
  },
  // Add alias for easier imports
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
