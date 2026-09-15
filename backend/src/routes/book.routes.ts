import type { FastifyInstance } from "fastify";
import { BookController, type CreateBookBody } from "../controllers/book.controller.js";
import { BookService } from "../services/book.service.js";
import { BookRepository } from "../repositories/book.repository.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const bookRoutes = async (app: FastifyInstance) => {
    const repository = new BookRepository();
    const service = new BookService(repository);
    const controller = new BookController(service);

    app.get("/api/books", controller.getBooks.bind(controller));
    app.get("/api/books/:id", controller.getBookById.bind(controller));
    app.post<{ Body: CreateBookBody }>(
        "/api/books",
        {
            preHandler: authMiddleware,
        },
        controller.createBook.bind(controller),
    );
};
