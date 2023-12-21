/* eslint-disable */
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: [
      { find: 'app', replacement: path.resolve(__dirname, './src/app/') },
      { find: 'assets', replacement: path.resolve(__dirname, './public/assets/') },
      { find: 'shared', replacement: path.resolve(__dirname, './src/shared/') },
      { find: 'tests', replacement: path.resolve(__dirname, './tests/') },
    ],
  },
});
