// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { resolve } from 'path'
// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: {
        initialIsOpen: false,
        inheritAttrs: false,
      },
    }),
  ],

  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1"),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1"),
      },
    ],
  },

  server: {
    port: 3030,
    proxy: {
      // ✅ أي طلب يبدأ بـ /api/ يتم تحويله إلى PHP backend
      "/api": {
        target: "http://localhost:8000", // خادم PHP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // يمكن تخصيصه حسب المسار
      },
    },
  },

  preview: {
    port: 8080,
  },
});