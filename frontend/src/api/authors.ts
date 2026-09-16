import { api } from "./client";
import type { Author } from "../types/book";

export const getAuthors = async () => {
    const response = await api.get<Author[]>("/api/authors");

    return response.data;
};
