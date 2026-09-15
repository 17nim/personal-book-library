import { AuthorRepository } from "../repositories/author.repository.js";

export class AuthorService {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async getAuthors() {
        return this.authorRepository.findAll();
    }
}
