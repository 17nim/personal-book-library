import { api } from "./client";

export const login = async (username: string, password: string) => {
    const response = await api.post<{ token: string }>("/api/login", {
        username,
        password,
    });

    return response.data;
};
