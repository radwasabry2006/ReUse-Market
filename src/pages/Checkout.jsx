
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle,
  MapPin,
  Phone,
  UserRound,
  ShoppingBag,
} from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'

export default function Checkout() {
  const { cart, clearCart } = useApp()
  const navigate = useNavigate()

  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState('')

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0),
    0
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in your name, phone number, and address.')
      return
    }

    if (cart.length === 0) {
      setError('Your cart is empty.')
      return
    }

    // Demo checkout: no real payment or backend order is created.
    clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <section className="container py-5 text-center">

        <CheckCircle
          size={75}
          className="text-success mb-3"
        />

        <h1 className="fw-bold">
          Order Placed Successfully!
        </h1>

        <p className="text-muted mt-3">
          Thank you for choosing ReUse Market.
          Your demo order has been completed.
        </p>

        <Link to="/explore" className="btn ru-btn mt-3">
          Continue Exploring
        </Link>

      </section>
    )
  }

  if (cart.length === 0) {
    return (
      <section className="container py-5 text-center">

        <ShoppingBag size={60} className="text-secondary mb-3" />

        <h2 className="fw-bold">Your Cart is Empty</h2>

        <p className="text-muted">
          Add some products before checking out.
        </p>

        <Link to="/explore" className="btn ru-btn mt-3">
          Explore Products
        </Link>

      </section>
    )
  }

  return (
    <section className="container py-5">

      <h1 className="fw-bold mb-2">
        Checkout
      </h1>

      <p className="text-muted mb-4">
        Enter your delivery details to complete your order.
      </p>

      <div className="row g-4">

        {/* Customer Information */}
        <div className="col-lg-7">

          <form
            className="card border-0 shadow-sm rounded-4"
            onSubmit={handleSubmit}
          >

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                Delivery Information
              </h4>


              <label className="form-label fw-semibold">
                Full Name
              </label>

              <div className="input-group mb-3">
                <span className="input-group-text bg-light">
                  <UserRound size={18} />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>


              <label className="form-label fw-semibold">
                Phone Number
              </label>

              <div className="input-group mb-3">
                <span className="input-group-text bg-light">
                  <Phone size={18} />
                </span>

                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>


              <label className="form-label fw-semibold">
                Delivery Address
              </label>

              <div className="input-group mb-3">
                <span className="input-group-text bg-light">
                  <MapPin size={18} />
                </span>

                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter your full delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>


              <label className="form-label fw-semibold">
                Additional Notes (Optional)
              </label>

              <textarea
                className="form-control mb-3"
                rows="2"
                placeholder="Any special delivery instructions?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />


              <div className="bg-light rounded-3 p-3 mb-3">
                <strong>Payment Method</strong>

                <p className="text-muted mb-0 mt-1">
                  Cash on Delivery (Demo)
                </p>
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn ru-btn w-100 py-3"
              >
                Confirm Order
              </button>

            </div>

          </form>

        </div>


        {/* Order Summary */}
        <div className="col-lg-5">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

              <h4 className="fw-bold mb-4">
                Your Order
              </h4>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between gap-3 mb-3"
                >
                  <div>
                    <strong>{item.name}</strong>

                    <small className="d-block text-muted">
                      {item.category}
                    </small>
                  </div>

                  <span className="fw-semibold text-nowrap">
                    {Number(item.price) > 0
                      ? `${Number(item.price).toLocaleString()} EGP`
                      : 'Free'}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Total</strong>

                <strong className="text-success">
                  {total.toLocaleString()} EGP
                </strong>
              </div>

              <p className="text-muted small mt-3 mb-0">
                Delivery charges are not included in this demo.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
