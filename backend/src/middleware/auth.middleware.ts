import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
        return reply.status(401).send({
            message: "Unauthorized",
        });
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
        return reply.status(401).send({
            message: "Invalid authorization header",
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    try {
        jwt.verify(token, secret);
    } catch {
        return reply.status(401).send({
            message: "Invalid or expired token",
        });
    }
};
