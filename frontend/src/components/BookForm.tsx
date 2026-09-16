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
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const authorIds = selectedAuthorId ? [Number(selectedAuthorId)] : [];
    const categoryIds = selectedCategoryId ? [Number(selectedCategoryId)] : [];

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
      setSelectedAuthorId("");
      setSelectedCategoryId("");

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

        <div className="field-group">
          <label htmlFor="author">Author</label>

          <select
            id="author"
            value={selectedAuthorId}
            onChange={(event) => setSelectedAuthorId(event.target.value)}
          >
            <option value="">Select an author</option>

            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={selectedCategoryId}
            onChange={(event) => setSelectedCategoryId(event.target.value)}
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="button button-primary button-wide" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </section>
  );
};
