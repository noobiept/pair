import { defineConfig } from 'vite';
import path from 'path';
import packageInfo from './package.json' with { type: 'json' };

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, `release/pair ${packageInfo.version}`),
        emptyOutDir: true,
    },
    server: {
        port: 8000,
    },
});
