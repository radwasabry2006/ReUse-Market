
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Plus,
  ShoppingCart,
  Heart,
  LogOut,
  LogIn,
} from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'
import logo from '../assets/logo.png'

export default function AppNavbar() {
  const [open, setOpen] = useState(false)

  const {
    user,
    logout,
    cart,
    favorites,
  } = useApp()

  const navigate = useNavigate()

  const close = () => setOpen(false)

  const initial = (user?.name || '?')
    .trim()
    .charAt(0)
    .toUpperCase()

  const handleLogout = () => {
    close()
    logout()
    navigate('/login')
  }

  return (
    <header className="ru-nav">
      <div className="container">

        {/* Logo */}
        <Link
          to="/"
          className="ru-brand"
          onClick={close}
        >
          <span className="ru-logo">
            <img
              src={logo}
              alt="ReUse Market Logo"
            />
          </span>

          <span>
            <span className="ru-brand-name d-block">
              ReUse Market
            </span>

            <span className="ru-brand-tag d-none d-md-block">
              A second life for everything.
            </span>
          </span>
        </Link>


        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="ru-toggle d-lg-none"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>


        {/* Navigation Links */}
        <nav className={`ru-menu ${open ? 'open' : ''}`}>

          <NavLink
            to="/"
            end
            className="ru-link"
            onClick={close}
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className="ru-link"
            onClick={close}
          >
            Explore
          </NavLink>

          <NavLink
            to="/add-item"
            className="ru-link ru-add"
            onClick={close}
          >
            <Plus size={18} />
            Add item
          </NavLink>


          <span className="ru-divider" />


          {/* Cart */}
          <NavLink
            to="/cart"
            className="ru-icon-link"
            aria-label={`Cart, ${cart.length} items`}
            title="Shopping Cart"
            onClick={close}
          >
            <ShoppingCart size={24} />

            {cart.length > 0 && (
              <span className="ru-badge">
                {cart.length > 99 ? '99+' : cart.length}
              </span>
            )}
          </NavLink>


          {/* Favorites */}
          <NavLink
            to="/favorites"
            className="ru-icon-link"
            aria-label={`Favorites, ${favorites.length} items`}
            title="My Favorites"
            onClick={close}
          >
            <Heart size={24} />

            {favorites.length > 0 && (
              <span className="ru-badge">
                {favorites.length > 99 ? '99+' : favorites.length}
              </span>
            )}
          </NavLink>


          {/* Logged In User */}
          {user ? (
            <>
              <NavLink
                to="/profile"
                className="ru-link ru-avatar-link"
                aria-label="Profile"
                title="My Profile"
                onClick={close}
              >
                <span className="ru-avatar">
                  {initial}
                </span>
              </NavLink>

              <span className="ru-divider" />

              <button
                type="button"
                className="ru-link ru-logout"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Log out
              </button>
            </>
          ) : (
            <>
              <span className="ru-divider" />

              <NavLink
                to="/login"
                className="ru-link ru-logout"
                onClick={close}
              >
                <LogIn size={20} />
                Log in
              </NavLink>

              <NavLink
                to="/register"
                className="ru-link"
                onClick={close}
              >
                Sign up
              </NavLink>
            </>
          )}

        </nav>
      </div>
    </header>
  )
}
