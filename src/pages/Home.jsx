import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Tag,
  Shirt,
  Armchair,
  ShoppingBag,
  BookOpen,
  House,
  Headphones,
  Ellipsis,
  Heart,
  Eye,
  MapPin,
  Search,
  ShoppingCart,
  Leaf,
} from 'lucide-react'
import Sparkle from '../components/Sparkle.jsx'
import Globe from '../components/Globe.jsx'
import { popularItems } from '../data/popularItems.js'
import { useApp } from '../context/AppContext.jsx'

const categories = [
  { label: 'Clothing', icon: Shirt },
  { label: 'Furniture', icon: Armchair },
  { label: 'Bags', icon: ShoppingBag },
  { label: 'Books', icon: BookOpen },
  { label: 'Home Decor', icon: House },
  { label: 'Electronics', icon: Headphones },
  { label: 'More', icon: Ellipsis },
]

const steps = [
  { icon: Search, title: 'Browse Items', text: 'Explore a wide range of pre-loved items' },
  { icon: ShoppingCart, title: 'Buy or Sell', text: 'Get great deals or list your own items' },
  { icon: Leaf, title: 'Support Sustainability', text: 'Help reduce waste and build a greener Egypt' },
]

function SectionHead({ eyebrow, title, linkText, to }) {
  return (
    <div className="ru-sec-head">
      <div className="ru-sec-title">
        <Sparkle />
        <div>
          <p className="ru-eyebrow">{eyebrow}</p>
          <h2 className="ru-serif">{title}</h2>
        </div>
      </div>
      {linkText && (
        <Link to={to} className="ru-viewall">
          {linkText} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}

function ItemCard({ item }) {
  const { user, favorites, toggleFavorite, cart, toggleCart } = useApp()
  const navigate = useNavigate()
  // guests are sent to Log in (with a short message) for these actions
  const needLogin = (message) => navigate('/login', { state: { notice: message } })
  const isFav = favorites.includes(item.id)
  const inCart = cart.some((c) => c.id === item.id)

  return (
    <article className="ru-card">
      <div className="ru-card-img">
        <img src={item.image} alt={item.name} />
        <span className={`ru-tag ${item.type === 'sale' ? 'ru-tag-sale' : 'ru-tag-donate'}`}>
          {item.type === 'sale' ? 'For Sale' : 'Donate'}
        </span>
        <button
          className="ru-fav"
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFav}
          onClick={() =>
            user ? toggleFavorite(item.id) : needLogin('Please log in to save favorites.')
          }
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="ru-card-body">
        <h3 className="ru-card-name">{item.name}</h3>
        <p className="ru-card-price">{item.price > 0 ? `EGP ${item.price}` : 'Free'}</p>
        <div className="ru-card-meta">
          <span>
            <MapPin size={14} /> {item.location}
          </span>
          <span>{item.condition}</span>
        </div>
        <div className="ru-card-actions">
          <Link
            to="/explore"
            className="btn ru-btn"
            onClick={(e) => {
              if (!user) {
                e.preventDefault()
                needLogin('Please log in to view item details.')
              }
            }}
          >
            <Eye size={17} /> View Details
          </Link>
          <button
            className={`ru-icon-btn ${inCart ? 'in-cart' : ''}`}
            aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
            aria-pressed={inCart}
            title={inCart ? 'In your cart (click to remove)' : 'Add to cart'}
            onClick={() =>
              user ? toggleCart(item) : needLogin('Please log in to add items to your cart.')
            }
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="ru-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h1 className="ru-serif">Give pre-loved items a new home.</h1>
              <p>
                Discover unique finds in Egypt and give your favorite items a
                second life.
              </p>
              <div className="ru-hero-actions">
                <Link to="/explore" className="btn ru-btn">
                  Explore products <ArrowRight size={16} />
                </Link>
                <Link to="/add-item" className="btn ru-btn ru-btn-outline">
                  <Tag size={16} /> Sell an item
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Shop by category ---------- */}
      <section className="ru-section">
        <div className="container">
          <SectionHead
            eyebrow="Our categories"
            title="Shop by Category"
            linkText="View all categories"
            to="/explore"
          />
          <div className="ru-cat-grid">
            {categories.map(({ label, icon: Icon }) => (
              <Link to="/explore" className="ru-cat" key={label}>
                <Icon size={28} strokeWidth={1.7} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Popular items ---------- */}
      <section className="ru-section">
        <div className="container">
          <SectionHead
            eyebrow="Recently listed"
            title="Popular Items"
            linkText="View all items"
            to="/explore"
          />
          <div className="row g-3 g-lg-4">
            {popularItems.slice(0, 4).map((item) => (
  <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
    <ItemCard item={item} />
  </div>
))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="ru-steps-wrap">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <SectionHead eyebrow="How it works" title="Simple Steps" />
              <div className="ru-steps">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <div className="d-flex" key={title}>
                    <div className="ru-step">
                      <div className="ru-step-icon">
                        <Icon size={32} strokeWidth={1.8} />
                      </div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowRight className="ru-step-arrow" size={20} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <Globe />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
