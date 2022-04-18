import express from 'express';
import { resolve } from 'path';

const { static: expressStatic } = express;

const port = 4000;
const build = 'build';

const app = express();
app.use(expressStatic(resolve(build)));
app.get('*', (_, res) => res.sendFile(resolve(build, 'index.html')));
app.listen(port, () =>
    console.log(
        `🚀 Client listening at port ${port} 🚀 at time: ${new Date()}`,
    ),
);
