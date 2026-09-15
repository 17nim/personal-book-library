import { BookRepository } from "../repositories/book.repository.js";

export class BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    async getBooks(filters?: { authorId?: number; categoryId?: number }) {
        return this.bookRepository.findAll(filters);
    }
    
    async getBookById(id: number) {
        return this.bookRepository.findById(id);
    }
}
