import { api } from "./client";
import type { Category } from "../types/book";

export const getCategories = async () => {
    const response = await api.get<Category[]>("/api/categories");

    return response.data;
};
