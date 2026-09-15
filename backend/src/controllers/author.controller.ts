import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthorService } from "../services/author.service.js";

export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    async getAuthors(_request: FastifyRequest, reply: FastifyReply) {
        const authors = await this.authorService.getAuthors();

        return reply.send(authors);
    }
}
