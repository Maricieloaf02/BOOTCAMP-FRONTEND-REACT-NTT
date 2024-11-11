import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Define que la raíz del proyecto es `src`
  build: {
    outDir: '../dist', // Genera la salida de producción en una carpeta fuera de `src`
  },
});
