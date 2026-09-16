import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import { bookRoutes } from "./routes/book.routes.js";
import { authorRoutes } from "./routes/author.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { authRoutes } from "./routes/auth.routes.js";

const app = fastify({
    logger: true,
});

app.register(cors, {
    origin: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
});

app.get("/health", async () => {
    return {
        status: "ok",
    };
});

app.register(bookRoutes);
app.register(authorRoutes);
app.register(categoryRoutes);
app.register(authRoutes);

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
