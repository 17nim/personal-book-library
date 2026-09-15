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
        return this.bookRepository.create(data);
    }

    async deleteBook(id: number) {
        return this.bookRepository.delete(id);
    }
}
