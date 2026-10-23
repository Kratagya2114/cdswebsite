import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Builds the frontend into ONE self-contained HTML file (hash routing, no backend).
export default defineConfig({ plugins: [react(), viteSingleFile()], build: { outDir: 'dist-preview' } });
