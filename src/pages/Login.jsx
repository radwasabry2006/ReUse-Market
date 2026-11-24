
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { signInWithGoogle, isGoogleConfigured } from "../firebase";
import GoogleDemoDialog from "../components/GoogleDemoDialog.jsx";
import LeafMark from "../components/LeafMark.jsx";
import GoogleLogo from "../components/GoogleLogo.jsx";

export default function Login({ onLogin, users = [] }) {
  const nav = useNavigate();

  // Message sent by pages that need an account
  const notice = useLocation().state?.notice;

  const [showDemo, setShowDemo] = useState(false);

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
    if (!isGoogleConfigured) {
      return setShowDemo(true);
    }

    try {
      setError("");

      // Firebase returns the user directly
      const googleUser = await signInWithGoogle();

      console.log("Google user:", googleUser);

      onLogin({
        name: googleUser.displayName || "User",
        email: googleUser.email,
        photoURL: googleUser.photoURL,
      });

      nav("/");
    } catch (error) {
      console.error("Google login error:", error);

      setError(
        error.code === "not-configured"
          ? error.message
          : "Google sign-in failed. Please try again."
      );
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Check email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  {
      return setError("Enter a valid email address.");
    }

    // Check password length
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    // Search for the registered account
    const account = users.find(
  (user) =>
    String(user.email || '').trim().toLowerCase() === email
);

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

    nav("/");
  };

  return (
    <section className="auth auth-login">
      <div className="auth-card">
        <LeafMark />

        <h1>Welcome back!</h1>

        <p className={`sub ${notice ? "notice" : ""}`}>
          {notice || "Log in to your account"}
        </p>

        <form onSubmit={submit} noValidate>
          <label htmlFor="email">
            <Mail size={22} strokeWidth={1.8} /> Email
          </label>

          <input
            id="email"
            className="input"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
          />

          <label htmlFor="password">
            <Lock size={22} strokeWidth={1.8} /> Password
          </label>

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
              className="eye-btn"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <Eye size={22} /> : <EyeOff size={22} />}
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
            Log In <ArrowRight size={22} />
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
          <GoogleLogo />
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

      {showDemo && (
        <GoogleDemoDialog
          onClose={() => setShowDemo(false)}
          onSubmit={(account) => {
            onLogin(account);
            nav("/");
          }}
        />
      )}
    </section>
  );
}
