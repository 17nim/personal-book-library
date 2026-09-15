import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title is too long"),

    authorIds: z
        .array(z.number().int().positive())
        .min(1, "At least one author is required"),

    categoryIds: z
        .array(z.number().int().positive())
        .min(1, "At least one category is required"),
});

export const bookIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const getBooksQuerySchema = z.object({
    authorId: z.coerce.number().int().positive().optional(),
    categoryId: z.coerce.number().int().positive().optional(),
});
