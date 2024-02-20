/* eslint-disable */
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    proxy: {
      '/geolab/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geolab\/api\/v1/, ''),
      },
      '/vWorld/api': {
        target: 'https://api.vworld.kr/req/address',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vWorld\/api/, ''),
      },
    },
  },
  plugins: [viteReact()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: [
      { find: 'axios', replacement: path.resolve(__dirname, './node_modules/axios/') },
      { find: 'app', replacement: path.resolve(__dirname, './src/app/') },
      { find: 'assets', replacement: path.resolve(__dirname, './public/assets/') },
      { find: 'shared', replacement: path.resolve(__dirname, './src/shared/') },
      { find: 'tests', replacement: path.resolve(__dirname, './tests/') },
    ],
  },
});
