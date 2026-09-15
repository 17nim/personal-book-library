import type { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UserRepository } from "../repositories/user.repository.js";

export const authRoutes = async (app: FastifyInstance) => {
    const repository = new UserRepository();
    const service = new AuthService(repository);
    const controller = new AuthController(service);

    app.post("/api/login", controller.login.bind(controller));
};
