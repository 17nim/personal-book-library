import { useEffect, useEffectEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBook, getBooks } from "../api/books";
import { getAuthors } from "../api/authors";
import { getCategories } from "../api/categories";
import { removeToken } from "../auth/auth";
import type { Author, Book, Category } from "../types/book";
import { BookFilters } from "../components/BookFilters";
import { BookForm } from "../components/BookForm";

export const BooksPage = () => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
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

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">A quiet place for good books</p>
          <h1>Personal Book Library</h1>
          <p className="page-intro">Keep track of the stories you want to remember.</p>
        </div>
        <button className="button button-quiet" type="button" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <div className="library-layout">
        <aside className="library-sidebar">
          <BookForm authors={authors} categories={categories} onCreated={handleBookCreated} />
        </aside>

        <section className="collection-area" aria-label="Book collection">
          <BookFilters
            authors={authors}
            categories={categories}
            authorId={authorId}
            categoryId={categoryId}
            onAuthorChange={setAuthorId}
            onCategoryChange={setCategoryId}
          />

          {loading ? (
            <p className="state-message">Loading your library...</p>
          ) : error ? (
            <>
              <p className="state-message">{error}</p>
              <button className="button button-primary" onClick={loadBooks}>Try again</button>
            </>
          ) : books.length === 0 ? (
            <p className="state-message empty-message">No books found.</p>
          ) : (
            <div className="book-grid">
              {books.map((book) => (
                <article className="book-card" key={book.id}>
                  <div className="book-card-topline">
                    <span className="book-mark" aria-hidden="true">✦</span>
                    <button className="delete-button" type="button" onClick={() => handleDeleteBook(book.id)}>
                      Delete
                    </button>
                  </div>
                  <h2>{book.title}</h2>

                  <div className="book-details">
                    <p>
                      <span className="detail-label">Authors</span>
                      {book.authors.map((author) => author.name).join(", ")}
                    </p>
                    <p>
                      <span className="detail-label">Categories</span>
                      {book.categories.map((category) => category.name).join(", ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
