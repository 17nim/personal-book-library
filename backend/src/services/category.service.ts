import { CategoryRepository } from "../repositories/category.repository.js";

export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getCategories() {
        return this.categoryRepository.findAll();
    }
}
