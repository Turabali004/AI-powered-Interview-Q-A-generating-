import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react'; // or your framework plugin
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // This maps the "@" symbol to your "src" folder
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// });