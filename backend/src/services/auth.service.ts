import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";

export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async login(username: string, password: string) {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
            return null;
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
            },
            secret,
            {
                expiresIn: "1h",
            },
        );

        return token;
    }
}
