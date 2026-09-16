export type Author = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Book = {
    id: number;
    title: string;
    authors: Author[];
    categories: Category[];
};

export type CreateBookRequest = {
    title: string;
    authorIds: number[];
    categoryIds: number[];
};
