import {
    pgTable,
    serial,
    varchar,
    integer,
    timestamp,
    primaryKey,
} from "drizzle-orm/pg-core";

// Main tables
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", {
        length: 50,
    })
        .notNull()
        .unique(),
    passwordHash: varchar("password_hash", {
        length: 255,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const books = pgTable("books", {
    id: serial("id").primaryKey(),

    title: varchar("title", {
        length: 255,
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const authors = pgTable("authors", {
    id: serial("id").primaryKey(),
    name: varchar("name", {
        length: 150,
    }).notNull(),
});

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", {
        length: 100,
    })
        .notNull()
        .unique(),
});

// Relational tables
export const bookAuthors = pgTable(
    "book_authors",
    {
        bookId: integer("book_id")
            .notNull()
            .references(() => books.id, {
                onDelete: "cascade",
            }),

        authorId: integer("author_id")
            .notNull()
            .references(() => authors.id, {
                onDelete: "cascade",
            }),
    },
    (table) => [
        primaryKey({
            columns: [table.bookId, table.authorId],
        }),
    ],
);

export const bookCategories = pgTable(
    "book_categories",
    {
        bookId: integer("book_id")
            .notNull()
            .references(() => books.id, {
                onDelete: "cascade",
            }),

        categoryId: integer("category_id")
            .notNull()
            .references(() => categories.id, {
                onDelete: "cascade",
            }),
    },
    (table) => [
        primaryKey({
            columns: [table.bookId, table.categoryId],
        }),
    ],
);
