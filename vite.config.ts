// packages/host/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        musicPlayer: {
          external: 'http://localhost:5001/dist/assets/remoteEntry.js',
          from: 'vite',
          externalType: 'url'
        }
      },
      shared: ['react', 'react-dom']
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  server: {
    port: 5000,
    strictPort: true,
    cors: true
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  preview: {
    port: 5000,
    strictPort: true,
    cors: true
  }
});