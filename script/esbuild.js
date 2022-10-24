import { build } from 'esbuild';

(() =>
    build({
        entryPoints: ['src/index.tsx'],
        outfile: 'build/index.js',
        loader: {
            '.ts': 'tsx',
            '.png': 'binary',
        },
        bundle: true,
        minify: true,
        sourcemap: true,
        platform: 'browser',
        logLevel: 'silent',
        watch: {
            onRebuild: (error, result) => console.log(error ?? result),
        },
    })
        .then((r) => {
            console.dir(r);
            console.log('Build succeeded.');
        })
        .catch((e) => {
            console.log('Error building:', e.message);
            process.exit(1);
        }))();
