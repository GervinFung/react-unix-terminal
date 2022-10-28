import Fastify from 'fastify';
import staticFileRouter from './route/static.js';

const main = () => {
    const fastify = Fastify({ logger: true });

    staticFileRouter(fastify);

    const port = parseInt(process.env.PORT || '4000');
    // ref: https://github.com/fastify/fastify/issues/709
    const host = process.env.HOST || '0.0.0.0';

    fastify.listen({ port, host }, (error) =>
        error
            ? fastify.log.error(error)
            : fastify.log.info(
                  `🚀 Fastify is listening at host: ${host}, at port :${port}, at time: ${new Date()} 🚀`,
              ),
    );
};

main();
