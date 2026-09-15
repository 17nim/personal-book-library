import { db } from "./index.js";
import {
    authors,
    categories,
    books,
    bookAuthors,
    bookCategories,
} from "./schema.js";

const seed = async () => {
    const insertedAuthors = await db
        .insert(authors)
        .values([
            { name: "Robert C. Martin" },
            { name: "Martin Fowler" },
            { name: "Eric Evans" },
        ])
        .returning();

    const insertedCategories = await db
        .insert(categories)
        .values([
            { name: "Programming" },
            { name: "Software Engineering" },
            { name: "Architecture" },
        ])
        .returning();

    const insertedBooks = await db
        .insert(books)
        .values([
            { title: "Clean Code" },
            { title: "Refactoring" },
            { title: "Domain-Driven Design" },
        ])
        .returning();

    await db.insert(bookAuthors).values([
        {
            bookId: insertedBooks[0]!.id,
            authorId: insertedAuthors[0]!.id,
        },
        {
            bookId: insertedBooks[1]!.id,
            authorId: insertedAuthors[1]!.id,
        },
        {
            bookId: insertedBooks[2]!.id,
            authorId: insertedAuthors[2]!.id,
        },
    ]);

    await db.insert(bookCategories).values([
        {
            bookId: insertedBooks[0]!.id,
            categoryId: insertedCategories[0]!.id,
        },
        {
            bookId: insertedBooks[0]!.id,
            categoryId: insertedCategories[1]!.id,
        },
        {
            bookId: insertedBooks[1]!.id,
            categoryId: insertedCategories[0]!.id,
        },
        {
            bookId: insertedBooks[1]!.id,
            categoryId: insertedCategories[1]!.id,
        },
        {
            bookId: insertedBooks[2]!.id,
            categoryId: insertedCategories[1]!.id,
        },
        {
            bookId: insertedBooks[2]!.id,
            categoryId: insertedCategories[2]!.id,
        },
    ]);

    console.log("Seed completed");
    process.exit(0);
};

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});
