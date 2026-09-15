import type { FastifyReply, FastifyRequest } from "fastify";
import { BookService } from "../services/book.service.js";
import {
    bookIdSchema,
    createBookSchema,
    getBooksQuerySchema,
} from "../schemas/book.schema.js";
import { z } from "zod";

type GetBooksQuery = {
    authorId?: string;
    categoryId?: string;
};

type GetBookParams = {
    id: string;
};

export type CreateBookBody = {
    title: string;
    authorIds: number[];
    categoryIds: number[];
};

export type DeleteBookParams = {
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
        const result = getBooksQuerySchema.safeParse(request.query);

        if (!result.success) {
            return reply.status(400).send({
                message: "Invalid query parameters",
                errors: z.treeifyError(result.error),
            });
        }

        const filters = {
            ...(result.data.authorId !== undefined && {
                authorId: result.data.authorId,
            }),
            ...(result.data.categoryId !== undefined && {
                categoryId: result.data.categoryId,
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
        const result = bookIdSchema.safeParse(request.params);

        if (!result.success) {
            return reply.status(400).send({
                message: "Invalid book ID",
            });
        }

        const book = await this.bookService.getBookById(result.data.id);

        if (!book) {
            return reply.status(404).send({
                message: "Book not found",
            });
        }

        return reply.send(book);
    }

    async createBook(
        request: FastifyRequest<{
            Body: CreateBookBody;
        }>,
        reply: FastifyReply,
    ) {
        const result = createBookSchema.safeParse(request.body);

        if (!result.success) {
            return reply.status(400).send({
                message: "Invalid request body",
                errors: result.error.flatten(),
            });
        }

        try {
            const book = await this.bookService.createBook(result.data);

            return reply.status(201).send(book);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "Author not found"
            ) {
                return reply.status(400).send({
                    message: "Author not found",
                });
            }

            if (
                error instanceof Error &&
                error.message === "Category not found"
            ) {
                return reply.status(400).send({
                    message: "Category not found",
                });
            }

            throw error;
        }
    }

    async deleteBook(
        request: FastifyRequest<{
            Params: DeleteBookParams;
        }>,
        reply: FastifyReply,
    ) {
        const result = bookIdSchema.safeParse(request.params);

        if (!result.success) {
            return reply.status(400).send({
                message: "Invalid book ID",
            });
        }

        const deleted = await this.bookService.deleteBook(result.data.id);

        if (!deleted) {
            return reply.status(404).send({
                message: "Book not found",
            });
        }

        return reply.status(204).send();
    }
}
