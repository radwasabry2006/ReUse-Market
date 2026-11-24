
import { useParams, Link } from 'react-router-dom'
import {
  Heart,
  MapPin,
  ShoppingCart,
  ArrowLeft,
  Package,
  UserRound,
  CheckCircle,
} from 'lucide-react'

import { popularItems } from '../data/popularItems'
import { useApp } from '../context/AppContext'


// Specifications for each category
const categorySpecifications = {
  Furniture: [
    { key: 'material', label: 'Material' },
    { key: 'color', label: 'Color' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'weight', label: 'Weight' },
    { key: 'usageDuration', label: 'Usage Duration' },
    { key: 'style', label: 'Style' },
  ],

  Electronics: [
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'storage', label: 'Storage' },
    { key: 'ram', label: 'RAM' },
    { key: 'battery', label: 'Battery' },
    { key: 'usageDuration', label: 'Usage Duration' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'warranty', label: 'Warranty' },
  ],

  'Home Appliances': [
    { key: 'brand', label: 'Brand' },
    { key: 'model', label: 'Model' },
    { key: 'power', label: 'Power' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'usageDuration', label: 'Usage Duration' },
    { key: 'workingStatus', label: 'Working Status' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'warranty', label: 'Warranty' },
  ],

  Clothing: [
    { key: 'brand', label: 'Brand' },
    { key: 'size', label: 'Size' },
    { key: 'color', label: 'Color' },
    { key: 'material', label: 'Material' },
    { key: 'fit', label: 'Fit' },
    { key: 'usageDuration', label: 'Usage Duration' },
    { key: 'gender', label: 'Gender' },
  ],

  Bags: [
    { key: 'brand', label: 'Brand' },
    { key: 'bagType', label: 'Bag Type' },
    { key: 'material', label: 'Material' },
    { key: 'color', label: 'Color' },
    { key: 'size', label: 'Size' },
    { key: 'compartments', label: 'Compartments' },
    { key: 'usageDuration', label: 'Usage Duration' },
  ],

  Books: [
    { key: 'title', label: 'Book Title' },
    { key: 'author', label: 'Author' },
    { key: 'publisher', label: 'Publisher' },
    { key: 'language', label: 'Language' },
    { key: 'pages', label: 'Pages' },
    { key: 'edition', label: 'Edition' },
  ],

  'Home Decor': [
    { key: 'material', label: 'Material' },
    { key: 'color', label: 'Color' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'weight', label: 'Weight' },
    { key: 'style', label: 'Style' },
  ],

  Accessories: [
    { key: 'brand', label: 'Brand' },
    { key: 'size', label: 'Size' },
    { key: 'color', label: 'Color' },
    { key: 'material', label: 'Material' },
    { key: 'fit', label: 'Fit' },
    { key: 'usageDuration', label: 'Usage Duration' },
    { key: 'gender', label: 'Gender' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'weight', label: 'Weight' },
    { key: 'style', label: 'Style' },
  ],

  Toys: [
    { key: 'material', label: 'Material' },
    { key: 'color', label: 'Color' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'weight', label: 'Weight' },
    { key: 'style', label: 'Style' },
  ],
}


export default function ProductDetails() {
  const { id } = useParams()

  const {
    items,
    user,
    favorites,
    toggleFavorite,
    cart,
    toggleCart,
  } = useApp()

  // Find the product in static products or user-added products
  const product = [
    ...popularItems,
    ...items,
  ].find((item) => String(item.id) === String(id))

  // Product not found
  if (!product) {
    return (
      <section className="container py-5 text-center">
        <Package size={55} className="text-secondary mb-3" />

        <h2>Product Not Found</h2>

        <p className="text-muted">
          Sorry, this product is not available.
        </p>

        <Link to="/explore" className="btn ru-btn mt-3">
          <ArrowLeft size={17} className="me-2" />
          Back to Explore
        </Link>
      </section>
    )
  }

  const isFavorite = favorites.includes(product.id)

  const isInCart = cart.some(
    (item) => String(item.id) === String(product.id)
  )

  const isDonation = String(product.type).toLowerCase().includes('donat')

  const productImage = product.image || product.photo

  const specifications = product.specifications || {}

  const fields = categorySpecifications[product.category] || []

  const visibleSpecifications = fields.filter(
    (field) => specifications[field.key] !== undefined &&
      specifications[field.key] !== null &&
      specifications[field.key] !== ''
  )

  const sellerName =
    product.owner && user?.email === product.owner
      ? 'You'
      : 'ReUse Market Member'

  return (
    <section className="container py-5">

      <Link
        to="/explore"
        className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Explore
      </Link>

      <div className="row g-4 g-lg-5 align-items-start">

        {/* Product Image - Left Side */}
        <div className="col-lg-5">

          <div
            className="rounded-4 bg-light d-flex align-items-center justify-content-center p-3"
            style={{ height: '500px' }}
          >
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="w-100 h-100 rounded-3"
                style={{
                  objectFit: 'contain',
                  maxHeight: '100%',
                }}
              />
            ) : (
              <div className="text-muted text-center">
                <Package size={60} />
                <p className="mt-2">No image available</p>
              </div>
            )}
          </div>

        </div>


        {/* Product Information - Right Side */}
        <div className="col-lg-7">

          {/* Category and Listing Type */}
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">

            <span className="badge bg-light text-dark px-3 py-2">
              {product.category}
            </span>

            <span
              className={`badge px-3 py-2 ${
                isDonation
                  ? 'bg-success-subtle text-success'
                  : 'bg-primary-subtle text-primary'
              }`}
            >
              {isDonation ? 'For Donation' : 'For Sale'}
            </span>

          </div>


          {/* Product Name */}
          <h1 className="fw-bold mb-3">
            {product.name}
          </h1>


          {/* Price */}
          <div className="mb-3">

            {isDonation ? (
              <h3 className="fw-bold text-success mb-0">
                Free
              </h3>
            ) : (
              <h3 className="fw-bold mb-0" style={{ color: '#198754' }}>
                {Number(product.price).toLocaleString()} EGP
              </h3>
            )}

          </div>


          {/* Condition and Location */}
          <div className="d-flex flex-wrap gap-3 mb-4">

            <div className="d-flex align-items-center gap-2 text-muted">
              <CheckCircle size={18} />
              <span>{product.condition || 'Not specified'}</span>
            </div>

            <div className="d-flex align-items-center gap-2 text-muted">
              <MapPin size={18} />
              <span>{product.location || 'Location not specified'}</span>
            </div>

          </div>


          <hr />


          {/* Description */}
          <div className="mb-4">

            <h5 className="fw-bold mb-2">
              Description
            </h5>

            <p
              className="text-muted mb-0"
              style={{ lineHeight: '1.8' }}
            >
              {product.description || 'No description available.'}
            </p>

          </div>


          {/* Specifications */}
          {visibleSpecifications.length > 0 && (
            <div className="mb-4">

              <h5 className="fw-bold mb-3">
                Product Specifications
              </h5>

              <div className="row g-3">

                {visibleSpecifications.map((field) => (
                  <div
                    className="col-sm-6"
                    key={field.key}
                  >
                    <div className="border rounded-3 p-3 h-100">

                      <small className="text-muted d-block mb-1">
                        {field.label}
                      </small>

                      <span className="fw-semibold">
                        {specifications[field.key]}
                      </span>

                    </div>
                  </div>
                ))}

              </div>

            </div>
          )}


          <hr />


          {/* Seller Information */}
          <div className="mb-4">

            <h5 className="fw-bold mb-3">
              Seller Information
            </h5>

            <div className="d-flex align-items-center gap-3">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#e8f5ec',
                  color: '#198754',
                }}
              >
                <UserRound size={24} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  {sellerName}
                </h6>

                <small className="text-muted">
                  ReUse Market Member
                </small>
              </div>

            </div>

          </div>


          {/* Action Buttons */}
          <div className="d-flex flex-wrap gap-3 mt-4">

            <button
              type="button"
              className="btn ru-btn flex-grow-1 py-3"
              onClick={() => toggleCart(product)}
            >
              <ShoppingCart size={18} className="me-2" />

              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>

            <button
              type="button"
              className="btn btn-outline-success py-3 px-4"
              onClick={() => toggleFavorite(product.id)}
              aria-label="Toggle favorite"
            >
              <Heart
                size={20}
                fill={isFavorite ? 'currentColor' : 'none'}
              />
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}
