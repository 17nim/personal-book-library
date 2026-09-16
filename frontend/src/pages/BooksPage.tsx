import { useEffect, useEffectEvent, useState } from "react";
import { deleteBook, getBooks } from "../api/books";
import { getAuthors } from "../api/authors";
import { getCategories } from "../api/categories";
import type { Author, Book, Category } from "../types/book";
import { BookFilters } from "../components/BookFilters";
import { BookForm } from "../components/BookForm";

export const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [authorId, setAuthorId] = useState<number>();
  const [categoryId, setCategoryId] = useState<number>();

  const handleBookCreated = async () => {
    await loadBooks();
  };

  const handleDeleteBook = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteBook(id);

      setBooks((current) => current.filter((book) => book.id !== id));
    } catch {
      setError("Failed to delete book");
    }
  };

  const loadBooks = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getBooks({
        authorId,
        categoryId,
      });
      setBooks(data);
    } catch {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const loadBooksEffect = useEffectEvent(loadBooks);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadBooksEffect();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [authorId, categoryId]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [authorsData, categoriesData] = await Promise.all([
          getAuthors(),
          getCategories(),
        ]);

        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch {
        setError("Failed to load filters");
      }
    };

    loadFilters();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={loadBooks}>Try again</button>
      </div>
    );
  }

  return (
    <main>
      <h1>Personal Book Library</h1>

      <BookForm
        authors={authors}
        categories={categories}
        onCreated={handleBookCreated}
      />
      <BookFilters
        authors={authors}
        categories={categories}
        authorId={authorId}
        categoryId={categoryId}
        onAuthorChange={setAuthorId}
        onCategoryChange={setCategoryId}
      />

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <article key={book.id}>
            <h2>{book.title}</h2>

            <p>
              <strong>Authors:</strong>{" "}
              {book.authors.map((author) => author.name).join(", ")}
            </p>

            <p>
              <strong>Categories:</strong>{" "}
              {book.categories.map((category) => category.name).join(", ")}
            </p>

            <button type="button" onClick={() => handleDeleteBook(book.id)}>
              Delete
            </button>
          </article>
        ))
      )}
    </main>
  );
};
