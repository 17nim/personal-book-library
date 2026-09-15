import { BookRepository } from "./repositories/book.repository.js";

const repository = new BookRepository();

const test = async () => {
    const books = await repository.findAll();

    console.dir(books, { depth: null });

    process.exit(0);
};

test();
