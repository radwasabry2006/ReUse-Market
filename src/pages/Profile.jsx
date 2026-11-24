import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Plus, Inbox, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Profile() {
  const { user, items, favorites, removeItem } = useApp()
  const location = useLocation()
  const [tab, setTab] = useState('listings')
  const [showSuccess, setShowSuccess] = useState(Boolean(location.state?.published))

  // Only this user's items. (Later: filter by user id from the backend.)
  const myItems = items.filter((i) => i.owner === user?.email)
  const incoming = 0
  const initial = (user?.name || '?').trim().charAt(0).toUpperCase()

  // not logged in -> go to Log in
  if (!user) return <Navigate to="/login" replace state={{ notice: 'Please log in to see your profile.' }} />

  return (
    <section className="container ru-profile">
      {showSuccess && (
        <div className="ru-success" role="status">
          <span>Your item was published and now appears in your listings.</span>
          <button aria-label="Close" onClick={() => setShowSuccess(false)}>
            ×
          </button>
        </div>
      )}

      {/* header */}
      <div className="ru-panel ru-profile-head">
        <div className="ru-profile-avatar">{initial}</div>
        <div>
          <p className="ru-eyebrow">Your profile</p>
          <h1 className="ru-serif">{user.name}</h1>
          <p className="ru-profile-email">{user.email}</p>
        </div>
        <Link to="/add-item" className="btn ru-btn">
          <Plus size={18} /> Add Item
        </Link>
      </div>

      {/* stats */}
      <div className="row g-3 g-lg-4">
        <div className="col-12 col-md-4">
          <div className="ru-panel ru-stat">
            <strong>{myItems.length}</strong>
            <span>Listed items</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="ru-panel ru-stat">
            <strong>{favorites.length}</strong>
            <span>Favorites</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="ru-panel ru-stat">
            <strong>{incoming}</strong>
            <span>Incoming requests</span>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="ru-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'listings'}
          className={`ru-tab ${tab === 'listings' ? 'active' : ''}`}
          onClick={() => setTab('listings')}
        >
          My listings
        </button>
        <button
          role="tab"
          aria-selected={tab === 'inbox'}
          className={`ru-tab ${tab === 'inbox' ? 'active' : ''}`}
          onClick={() => setTab('inbox')}
        >
          Inbox ({incoming})
        </button>
      </div>

      <p className="ru-eyebrow">Your activity</p>
      <h2 className="ru-serif ru-activity-title">
        {tab === 'listings' ? 'Your listed items' : 'Your inbox'}
      </h2>

      {/* listings tab */}
      {tab === 'listings' &&
        (myItems.length === 0 ? (
          <div className="ru-panel ru-empty">
            <Plus size={26} />
            <h3>No listings yet</h3>
            <p>List something you no longer need — it will appear here and on Explore.</p>
          </div>
        ) : (
          <div className="ru-panel ru-listings">
            <div className="row g-3 g-lg-4">
              {myItems.map((item) => (
                <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                  <article className="ru-card">
                    <div className="ru-card-img">
                      {item.photo ? (
                        <img src={item.photo} alt={item.name} />
                      ) : (
                        <div className="h-100 d-grid place-items-center text-muted small">
                          No photo
                        </div>
                      )}
                      <span
                        className={`ru-tag ${item.type === 'sale' ? 'ru-tag-sale' : 'ru-tag-donate'}`}
                      >
                        {item.type === 'sale' ? 'For Sale' : 'Donate'}
                      </span>
                    </div>
                    <div className="ru-card-body">
                      <h3 className="ru-card-name">{item.name}</h3>
                      <p className="ru-card-price">
                        {item.price > 0 ? `EGP ${item.price}` : 'Free'}
                      </p>
                      <div className="ru-card-meta">
                        <span>{item.category}</span>
                        <span>{item.condition}</span>
                      </div>
                      <div className="ru-card-actions">
                        <button
                          className="btn ru-btn ru-btn-outline"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* inbox tab */}
      {tab === 'inbox' && (
        <div className="ru-panel ru-empty">
          <Inbox size={26} />
          <h3>Your inbox is empty</h3>
          <p>Requests from people interested in your items will show up here.</p>
        </div>
      )}
    </section>
  )
}
