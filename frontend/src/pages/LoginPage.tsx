import { type SubmitEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { setToken } from "../auth/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);

      setToken(data.token);

      const from = location.state?.from?.pathname || "/";

      navigate(from, { replace: true });
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-shell">
      <section className="login-panel">
        <p className="eyebrow">Personal Book Library</p>
        <h1>Welcome back.</h1>
        <p className="login-intro">Sign in to return to your shelves.</p>

        <form className="login-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="button button-primary button-wide" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        </form>
      </section>
    </main>
  );
};
