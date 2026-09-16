import type { Author, Category } from "../types/book";

type BookFiltersProps = {
  authors: Author[];
  categories: Category[];
  authorId?: number;
  categoryId?: number;
  onAuthorChange: (id?: number) => void;
  onCategoryChange: (id?: number) => void;
};

export const BookFilters = ({
  authors,
  categories,
  authorId,
  categoryId,
  onAuthorChange,
  onCategoryChange,
}: BookFiltersProps) => {
  return (
    <section>
      <label>
        Author:{" "}
        <select
          value={authorId ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onAuthorChange(value ? Number(value) : undefined);
          }}
        >
          <option value="">All authors</option>

          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </label>{" "}
      <label>
        Category:{" "}
        <select
          value={categoryId ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            onCategoryChange(value ? Number(value) : undefined);
          }}
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
};
