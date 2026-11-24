
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
} from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'

export default function Cart() {
  const { cart, toggleCart } = useApp()
  const navigate = useNavigate()

  const [quantities, setQuantities] = useState({})

  const getQuantity = (id) => quantities[id] || 1

  const updateQuantity = (id, change) => {
    setQuantities((prev) => {
      const current = prev[id] || 1
      const next = Math.max(1, current + change)

      return {
        ...prev,
        [id]: next,
      }
    })
  }

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * getQuantity(item.id),
    0
  )

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <section className="container py-5 text-center">
        <ShoppingCart size={65} className="text-secondary mb-3" />

        <h2 className="fw-bold">Your Cart is Empty</h2>

        <p className="text-muted">
          You haven't added any items to your cart yet.
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

      <Link
        to="/explore"
        className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 mb-4"
      >
        <ArrowLeft size={18} />
        Continue Shopping
      </Link>

      <div className="mb-4">
        <h1 className="fw-bold">Shopping Cart</h1>
        <p className="text-muted">
          You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart.
        </p>
      </div>

      <div className="row g-4">

        {/* Cart Items */}
        <div className="col-lg-8">

          <div className="d-flex flex-column gap-3">

            {cart.map((item) => (
              <div
                key={item.id}
                className="card border-0 shadow-sm rounded-4"
              >
                <div className="card-body p-3">

                  <div className="row align-items-center g-3">

                    <div className="col-4 col-md-3">
                      <div
                        className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                        style={{ height: '130px' }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-100 h-100 rounded-3"
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <ShoppingBag size={35} className="text-secondary" />
                        )}
                      </div>
                    </div>

                    <div className="col-8 col-md-9">

                      <div className="d-flex justify-content-between gap-2">

                        <div>
                          <h5 className="fw-bold mb-1">
                            {item.name}
                          </h5>

                          <small className="text-muted">
                            {item.category}
                          </small>

                          <div className="fw-bold text-success mt-2">
                            {Number(item.price) > 0
                              ? `${Number(item.price).toLocaleString()} EGP`
                              : 'Free'}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger align-self-start"
                          onClick={() => toggleCart(item)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      <div className="d-flex align-items-center gap-2 mt-3">

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={getQuantity(item.id) === 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="fw-semibold">
                          {getQuantity(item.id)}
                        </span>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>


        {/* Order Summary */}
        <div className="col-lg-4">

          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                Order Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>{total.toLocaleString()} EGP</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Delivery</span>
                <span>Not included</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-success">
                  {total.toLocaleString()} EGP
                </strong>
              </div>

              <button
                type="button"
                className="btn ru-btn w-100 py-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
