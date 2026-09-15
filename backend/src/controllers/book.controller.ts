import type { FastifyReply, FastifyRequest } from "fastify";
import { BookService } from "../services/book.service.js";

type GetBooksQuery = {
    authorId?: string;
    categoryId?: string;
};

type GetBookParams = {
    id: string;
};

export class BookController {
    constructor(private readonly bookService: BookService) {}

    async getBooks(
        request: FastifyRequest<{
            Querystring: GetBooksQuery;
        }>,
        reply: FastifyReply,
    ) {
        const filters = {
            ...(request.query.authorId !== undefined && {
                authorId: Number(request.query.authorId),
            }),
            ...(request.query.categoryId !== undefined && {
                categoryId: Number(request.query.categoryId),
            }),
        };

        const books = await this.bookService.getBooks(filters);

        return reply.send(books);
    }
    
    async getBookById(
        request: FastifyRequest<{
            Params: GetBookParams;
        }>,
        reply: FastifyReply,
    ) {
        const id = Number(request.params.id);

        const book = await this.bookService.getBookById(id);

        if (!book) {
            return reply.status(404).send({
                message: "Book not found",
            });
        }

        return reply.send(book);
    }
}
