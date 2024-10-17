import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   preprocessorOptions: {
  //     // scss: {
  //     //   additionalData: `@import "./src/adminPanel/assets/scss/argon-dashboard/custom/_variables.scss";`,
  //     //   includePaths: [path.resolve(__dirname, 'node_modules')]
  //     // }
  //   }
  // },
})