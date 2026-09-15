import type { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/category.controller.js";
import { CategoryService } from "../services/category.service.js";
import { CategoryRepository } from "../repositories/category.repository.js";

export const categoryRoutes = async (app: FastifyInstance) => {
    const repository = new CategoryRepository();
    const service = new CategoryService(repository);
    const controller = new CategoryController(service);

    app.get("/api/categories", controller.getCategories.bind(controller));
};
