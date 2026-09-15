import { db } from "../db/index.js";
import { categories } from "../db/schema.js";

export class CategoryRepository {
    async findAll() {
        return db
            .select({
                id: categories.id,
                name: categories.name,
            })
            .from(categories);
    }
}
