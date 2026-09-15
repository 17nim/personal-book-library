import { db } from "../db/index.js";
import { authors } from "../db/schema.js";

export class AuthorRepository {
    async findAll() {
        return db
            .select({
                id: authors.id,
                name: authors.name,
            })
            .from(authors);
    }
}
