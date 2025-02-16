import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

import packageInfo from './package.json' with { type: 'json' };

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, `release/pair ${packageInfo.version}`),
        emptyOutDir: true,
    },
    plugins: [react()],
    server: {
        port: 8000,
    },
    test: {
        include: ['source/**/*.test.{ts,tsx}'],
        coverage: {
            include: ['source/**/*.{ts,tsx}'],
        },
    },
});
