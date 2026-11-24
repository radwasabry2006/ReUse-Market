
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'
import { popularItems } from '../data/popularItems'

export default function Favorites() {
  const { items, favorites, toggleFavorite, toggleCart, cart } = useApp()

  // Find saved products from both static and user-added products
  const allProducts = [...popularItems, ...items]

  const favoriteProducts = allProducts.filter((product) =>
    favorites.some((id) => String(id) === String(product.id))
  )

  if (favoriteProducts.length === 0) {
    return (
      <section className="container py-5 text-center">

        <Heart size={65} className="text-secondary mb-3" />

        <h2 className="fw-bold">Your Wishlist is Empty</h2>

        <p className="text-muted">
          Save your favorite products and find them here later.
        </p>

        <Link to="/explore" className="btn ru-btn mt-3">
          <ShoppingBag size={18} className="me-2" />
          Explore Products
        </Link>

      </section>
    )
  }

  return (
    <section className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">My Favorites</h1>

        <p className="text-muted">
          You have saved {favoriteProducts.length} favorite products.
        </p>
      </div>

      <div className="row g-4">

        {favoriteProducts.map((product) => {
          const image = product.image || product.photo

          const isInCart = cart.some(
            (item) => String(item.id) === String(product.id)
          )

          const isDonation =
            String(product.type).toLowerCase().includes('donat')

          return (
            <div className="col-sm-6 col-lg-4" key={product.id}>

              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                <div
                  className="position-relative bg-light"
                  style={{ height: '230px' }}
                >

                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center">
                      <ShoppingBag size={45} className="text-secondary" />
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={`Remove ${product.name} from favorites`}
                  >
                    <Heart
                      size={19}
                      fill="currentColor"
                      className="text-danger"
                    />
                  </button>

                </div>


                <div className="card-body p-3 d-flex flex-column">

                  <small className="text-muted mb-2">
                    {product.category}
                  </small>

                  <h5 className="fw-bold">
                    {product.name}
                  </h5>

                  <h5 className="text-success fw-bold mb-3">
                    {isDonation
                      ? 'Free'
                      : `${Number(product.price).toLocaleString()} EGP`}
                  </h5>

                  <div className="d-flex gap-2 mt-auto">

                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-outline-success flex-grow-1"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      className="btn ru-btn"
                      onClick={() => toggleCart(product)}
                      title={isInCart ? 'Remove from cart' : 'Add to cart'}
                    >
                      {isInCart ? (
                        <Trash2 size={18} />
                      ) : (
                        <ShoppingBag size={18} />
                      )}
                    </button>

                  </div>

                </div>

              </div>

            </div>
          )
        })}

      </div>

    </section>
  )
}
