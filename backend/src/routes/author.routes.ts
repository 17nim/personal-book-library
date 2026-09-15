import type { FastifyInstance } from "fastify";
import { AuthorController } from "../controllers/author.controller.js";
import { AuthorService } from "../services/author.service.js";
import { AuthorRepository } from "../repositories/author.repository.js";

export const authorRoutes = async (app: FastifyInstance) => {
    const repository = new AuthorRepository();
    const service = new AuthorService(repository);
    const controller = new AuthorController(service);

    app.get("/api/authors", controller.getAuthors.bind(controller));
};
