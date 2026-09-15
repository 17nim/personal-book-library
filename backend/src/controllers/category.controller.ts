import type { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService } from "../services/category.service.js";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async getCategories(_request: FastifyRequest, reply: FastifyReply) {
        const categories = await this.categoryService.getCategories();

        return reply.send(categories);
    }
}
