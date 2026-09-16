import { api } from "./client";
import type { Book, CreateBookRequest } from "../types/book";

export const getBooks = async (params?: {
    authorId?: number;
    categoryId?: number;
}) => {
    const response = await api.get<Book[]>("/api/books", {
        params,
    });

    return response.data;
};

export const getBookById = async (id: number) => {
    const response = await api.get<Book>(`/api/books/${id}`);

    return response.data;
};

export const createBook = async (data: CreateBookRequest) => {
    const response = await api.post<Book>("/api/books", data);

    return response.data;
};

export const deleteBook = async (id: number) => {
    await api.delete(`/api/books/${id}`);
};
