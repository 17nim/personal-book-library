import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth.service.js";

type LoginBody = {
    username: string;
    password: string;
};

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async login(
        request: FastifyRequest<{
            Body: LoginBody;
        }>,
        reply: FastifyReply,
    ) {
        const { username, password } = request.body;

        const token = await this.authService.login(username, password);

        if (!token) {
            return reply.status(401).send({
                message: "Invalid username or password",
            });
        }

        return reply.send({
            token,
        });
    }
}
