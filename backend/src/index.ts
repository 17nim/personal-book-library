import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify({
    logger: true,
});

app.register(cors, {
    origin: true,
});

app.get("/health", async () => {
    return {
        status: "ok",
    };
});

const start = async () => {
    try {
        await app.listen({
            port: 3000,
            host: "0.0.0.0",
        });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
