import { type SubmitEvent, useState } from "react";
import { createBook } from "../api/books";
import type { Author, Category } from "../types/book";

type BookFormProps = {
  authors: Author[];
  categories: Category[];
  onCreated: () => void;
};

export const BookForm = ({ authors, categories, onCreated }: BookFormProps) => {
  const [title, setTitle] = useState("");
  const [authorIds, setAuthorIds] = useState<number[]>([]);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuthorChange = (id: number) => {
    setAuthorIds((current) =>
      current.includes(id)
        ? current.filter((authorId) => authorId !== id)
        : [...current, id],
    );
  };

  const handleCategoryChange = (id: number) => {
    setCategoryIds((current) =>
      current.includes(id)
        ? current.filter((categoryId) => categoryId !== id)
        : [...current, id],
    );
  };

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (authorIds.length === 0) {
      setError("Select at least one author");
      return;
    }

    if (categoryIds.length === 0) {
      setError("Select at least one category");
      return;
    }

    setLoading(true);

    try {
      await createBook({
        title: title.trim(),
        authorIds,
        categoryIds,
      });

      setTitle("");
      setAuthorIds([]);
      setCategoryIds([]);

      onCreated();
    } catch {
      setError("Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-book-panel">
      <h2>Add Book</h2>
      <p className="section-caption">Save a new title to your collection.</p>

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <fieldset className="choice-group">
          <legend>Authors</legend>

          {authors.map((author) => (
            <label className="choice-label" key={author.id}>
              <input
                type="checkbox"
                checked={authorIds.includes(author.id)}
                onChange={() => handleAuthorChange(author.id)}
              />

              {author.name}
            </label>
          ))}
        </fieldset>

        <fieldset className="choice-group">
          <legend>Categories</legend>

          {categories.map((category) => (
            <label className="choice-label" key={category.id}>
              <input
                type="checkbox"
                checked={categoryIds.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />

              {category.name}
            </label>
          ))}
        </fieldset>

        {error && <p className="form-error">{error}</p>}

        <button className="button button-primary button-wide" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </section>
  );
};
