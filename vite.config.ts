import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';

export default defineConfig(() => {
    const currentDir = process.cwd();

    const serveOptions = {
        port: 3000,
        open: true,
    };

    return {
        root: `${currentDir}/src`,
        plugins: [React()],
        server: serveOptions,
        preview: serveOptions,
        build: {
            manifest: true,
            minify: 'esbuild',
        },
    };
});
