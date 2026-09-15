import { BookRepository } from "../repositories/book.repository.js";

export class BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    async getBooks(filters?: { authorId?: number; categoryId?: number }) {
        return this.bookRepository.findAll(filters);
    }

    async getBookById(id: number) {
        return this.bookRepository.findById(id);
    }

    async createBook(data: {
        title: string;
        authorIds: number[];
        categoryIds: number[];
    }) {
        const authorsExist = await this.bookRepository.authorsExist(
            data.authorIds,
        );

        if (!authorsExist) {
            throw new Error("Author not found");
        }

        const categoriesExist = await this.bookRepository.categoriesExist(
            data.categoryIds,
        );

        if (!categoriesExist) {
            throw new Error("Category not found");
        }

        return this.bookRepository.create(data);
    }

    async deleteBook(id: number) {
        return this.bookRepository.delete(id);
    }
}
