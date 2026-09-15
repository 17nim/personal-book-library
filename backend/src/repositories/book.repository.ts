import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import {
    books,
    authors,
    categories,
    bookAuthors,
    bookCategories,
} from "../db/schema.js";

export class BookRepository {
    async findAll(filters?: { authorId?: number; categoryId?: number }) {
        const bookRows = await db
            .select({
                id: books.id,
                title: books.title,
            })
            .from(books);

        const authorRows = await db
            .select({
                bookId: bookAuthors.bookId,
                authorId: authors.id,
                authorName: authors.name,
            })
            .from(bookAuthors)
            .innerJoin(authors, eq(bookAuthors.authorId, authors.id));

        const categoryRows = await db
            .select({
                bookId: bookCategories.bookId,
                categoryId: categories.id,
                categoryName: categories.name,
            })
            .from(bookCategories)
            .innerJoin(
                categories,
                eq(bookCategories.categoryId, categories.id),
            );

        let filteredBooks = bookRows;

        if (filters?.authorId !== undefined) {
            const bookIds = authorRows
                .filter((row) => row.authorId === filters.authorId)
                .map((row) => row.bookId);

            filteredBooks = filteredBooks.filter((book) =>
                bookIds.includes(book.id),
            );
        }

        if (filters?.categoryId !== undefined) {
            const bookIds = categoryRows
                .filter((row) => row.categoryId === filters.categoryId)
                .map((row) => row.bookId);

            filteredBooks = filteredBooks.filter((book) =>
                bookIds.includes(book.id),
            );
        }

        return filteredBooks.map((book) => ({
            id: book.id,
            title: book.title,

            authors: authorRows
                .filter((row) => row.bookId === book.id)
                .map((row) => ({
                    id: row.authorId,
                    name: row.authorName,
                })),

            categories: categoryRows
                .filter((row) => row.bookId === book.id)
                .map((row) => ({
                    id: row.categoryId,
                    name: row.categoryName,
                })),
        }));
    }

    async findById(id: number) {
        const bookRows = await db
            .select({
                id: books.id,
                title: books.title,
            })
            .from(books)
            .where(eq(books.id, id));

        if (bookRows.length === 0) {
            return null;
        }

        const book = bookRows[0];

        const authorRows = await db
            .select({
                id: authors.id,
                name: authors.name,
            })
            .from(bookAuthors)
            .innerJoin(authors, eq(bookAuthors.authorId, authors.id))
            .where(eq(bookAuthors.bookId, id));

        const categoryRows = await db
            .select({
                id: categories.id,
                name: categories.name,
            })
            .from(bookCategories)
            .innerJoin(categories, eq(bookCategories.categoryId, categories.id))
            .where(eq(bookCategories.bookId, id));

        return {
            id: book!.id,
            title: book!.title,
            authors: authorRows,
            categories: categoryRows,
        };
    }
}
