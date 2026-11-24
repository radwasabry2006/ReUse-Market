
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { signInWithGoogle, isGoogleConfigured } from '../firebase';
import GoogleDemoDialog from '../components/GoogleDemoDialog.jsx';
import LeafMark from '../components/LeafMark.jsx';
import GoogleLogo from '../components/GoogleLogo.jsx';


export default function Register({ onLogin, users = [], registerUser }) {
  const nav = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const set = k => e => {
    setForm({ ...form, [k]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = async () => {
    if (!isGoogleConfigured) {
      return setShowDemo(true);
    }

    try {
      setError('');

      // Firebase returns the user directly
      const googleUser = await signInWithGoogle();

      console.log('Google user:', googleUser);

      onLogin({
        name: googleUser.displayName || 'User',
        email: googleUser.email,
        photoURL: googleUser.photoURL
      });

      nav('/');
    } catch (error) {
      console.error('Google registration error:', error);

      setError(
        error.code === 'not-configured'
          ? error.message
          : 'Google sign-in failed. Please try again.'
      );
    }
  };

  const submit = e => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Check name
    if (!name) {
      return setError('Enter your full name.');
    }

    // Check email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Enter a valid email address.');
    }

    // Check password length
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    // Check password confirmation
    if (password !== form.confirm) {
      return setError('Passwords do not match.');
    }

    // Check if email already exists
    const emailExists = users.some(
  user =>
    String(user.email || '').trim().toLowerCase() === email
);

    if (emailExists) {
      return setError(
        'This email is already registered. Please log in.'
      );
    }

    // Create new account
    const newUser = {
      name,
      email,
      password
    };

    // Save account
    registerUser(newUser)

    // Log in the new user
    onLogin({
      name: newUser.name,
      email: newUser.email
    });

    nav('/');
  };

  return (
    <section className="auth auth-register">
      <div className="auth-card">
        <LeafMark />

        <h1>Create your account</h1>

        <p className="sub">
          Join our community and give items a second life.
        </p>

        <form onSubmit={submit} noValidate>
          <div className="field">
            <User className="field-icon" size={24} strokeWidth={1.8} />
            <input
              className="input"
              placeholder="Full name"
              aria-label="Full name"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
            />
          </div>

          <div className="field">
            <Mail className="field-icon" size={24} strokeWidth={1.8} />
            <input
              className="input"
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="field pw">
            <Lock className="field-icon" size={24} strokeWidth={1.8} />
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              aria-label="Password"
              value={form.password}
              onChange={set('password')}
              autoComplete="new-password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="field pw">
            <Lock className="field-icon" size={24} strokeWidth={1.8} />
            <input
              className="input"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm password"
              aria-label="Confirm password"
              value={form.confirm}
              onChange={set('confirm')}
              autoComplete="new-password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
          </div>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button
            className="btn btn-primary btn-block"
            type="submit"
          >
            Create Account <ArrowRight size={22} />
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
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      <div className="auth-side">
        <h2>Give your things a second life.</h2>

        <p>
          Sell what you no longer need, donate what can help
          someone else, or exchange it for something new to you.
        </p>
      </div>

      {showDemo && (
        <GoogleDemoDialog
          onClose={() => setShowDemo(false)}
          onSubmit={(account) => {
            onLogin(account);
            nav('/');
          }}
        />
      )}
    </section>
  );
}
