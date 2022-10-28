import path from 'path';
import fastifyStatic from '@fastify/static';

const staticFileRouter = (fastifyInstance) => {
    const build = '/build-local';

    fastifyInstance.register(fastifyStatic, {
        wildcard: false,
        root: path.join(path.resolve(), build),
    });

    fastifyInstance.get('/*', ({ raw: { url } }, reply) =>
        url
            ? reply.status(200).sendFile(url)
            : reply.status(404).send('Invalid Assset URL'),
    );
};

export default staticFileRouter;
