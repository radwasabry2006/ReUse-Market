import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import googleLogo from "../assets/google.png";

export default function Login({ onLogin, users = [] }) {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setError("");
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");

      const result = await signInWithGoogle();
      const googleUser = result.user;

      onLogin({
        name: googleUser.displayName || "User",
        email: googleUser.email,
        photoURL: googleUser.photoURL,
      });

      nav("/explore");
    } catch (error) {
      console.error("Google login error:", error);

      setError("Google sign-in failed. Please try again.");
    }
  };
  const submit = (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Check email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError("Enter a valid email address.");
    }

    // Check password length
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    // Search for the registered account
    const account = users.find((user) => user.email.toLowerCase() === email);

    // Account does not exist
    if (!account) {
      return setError("Account not found. Please sign up first.");
    }

    // Check password
    if (account.password !== password) {
      return setError("Incorrect password. Please try again.");
    }

    // Login successful
    onLogin({
      name: account.name,
      email: account.email,
    });

    nav("/explore");
  };

  return (
    <section className="auth">
      <div className="auth-card">
        <div className="auth-leaf"></div>

        <h1>Welcome back!</h1>
        <p className="sub">Log in to your account</p>

        <form onSubmit={submit} noValidate>
          <label htmlFor="email">✉ Email</label>

          <input
            id="email"
            className="input"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
          />

          <label htmlFor="password">🔒 Password</label>

          <div className="pw">
            <input
              id="password"
              className="input"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={set("password")}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="link-btn eye-btn"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              <i className={show ? "fi fi-rr-eye" : "fi fi-rr-eye-crossed"}></i>
            </button>
          </div>

          <a className="forgot" href="#forgot">
            Forgot password?
          </a>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn-primary btn-block" type="submit">
            Log In →
          </button>
        </form>

        <div className="or">
          <span>or</span>
        </div>

        <button
          className="btn btn-outline btn-block google-btn"
          type="button"
          onClick={handleGoogleLogin}
        >
          <img src={googleLogo} alt="Google" className="google-logo" />
          Continue with Google
        </button>

        <p className="switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>

      <div className="auth-side">
        <h2>Give your things a second life.</h2>
        <p>
          Sell what you no longer need, donate what can help someone else, or
          exchange it for something new to you.
        </p>
      </div>
    </section>
  );
}
