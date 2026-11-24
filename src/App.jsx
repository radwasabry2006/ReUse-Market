import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AppNavbar from './components/AppNavbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AddItem from './pages/AddItem.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import { useApp } from './context/AppContext.jsx'
import Explore from './pages/Explore.jsx';
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import Checkout from './pages/Checkout'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { login, users, registerUser } = useApp()
  const { pathname } = useLocation()
  // Login & Register are full-screen pages in the design: no navbar / footer
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <div className="app-shell">
      <ScrollToTop />
      {!isAuthPage && <AppNavbar />}
      <main className="app-main">
        <Routes>
          <Route path="/"element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login onLogin={login} users={users} />} />
          <Route path="/register" element={ <Register onLogin={login} users={users} registerUser={registerUser} /> } />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ComingSoon title="Page not found" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}
