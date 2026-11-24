
import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ImagePlus, ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'


// Available categories
const CATEGORIES = [
  'Furniture',
  'Electronics',
  'Home Appliances',
  'Clothing',
  'Bags',
  'Books',
  'Home Decor',
]

const CONDITIONS = ['Like New', 'Good', 'Fair']


// Different specifications for each category
const CATEGORY_FIELDS = {
  Furniture: [
    { name: 'material', label: 'Material', placeholder: 'e.g. Wood, Metal' },
    { name: 'color', label: 'Color', placeholder: 'e.g. Brown' },
    { name: 'dimensions', label: 'Dimensions', placeholder: 'e.g. 120 x 60 x 75 cm' },
    { name: 'weight', label: 'Weight', placeholder: 'e.g. 18 kg' },
    { name: 'usageDuration', label: 'Usage Duration', placeholder: 'e.g. 2 years' },
    { name: 'style', label: 'Style', placeholder: 'e.g. Modern, Classic' },
  ],

  Electronics: [
    { name: 'brand', label: 'Brand', placeholder: 'e.g. Samsung, Apple' },
    { name: 'model', label: 'Model', placeholder: 'e.g. Galaxy A54' },
    { name: 'storage', label: 'Storage', placeholder: 'e.g. 128 GB' },
    { name: 'ram', label: 'RAM', placeholder: 'e.g. 8 GB' },
    { name: 'battery', label: 'Battery', placeholder: 'e.g. 5000 mAh' },
    { name: 'usageDuration', label: 'Usage Duration', placeholder: 'e.g. 6 months' },
    { name: 'accessories', label: 'Accessories', placeholder: 'e.g. Charger, Box' },
    { name: 'warranty', label: 'Warranty', placeholder: 'e.g. 6 months, No warranty' },
  ],

  'Home Appliances': [
    { name: 'brand', label: 'Brand', placeholder: 'e.g. Philips, Tefal' },
    { name: 'model', label: 'Model', placeholder: 'Enter model name' },
    { name: 'power', label: 'Power', placeholder: 'e.g. 1500 W' },
    { name: 'capacity', label: 'Capacity', placeholder: 'e.g. 5 Liters' },
    { name: 'usageDuration', label: 'Usage Duration', placeholder: 'e.g. 1 year' },
    { name: 'workingStatus', label: 'Working Status', placeholder: 'e.g. Fully working' },
    { name: 'accessories', label: 'Accessories', placeholder: 'e.g. Power cable, Manual' },
    { name: 'warranty', label: 'Warranty', placeholder: 'e.g. 1 year, No warranty' },
  ],

  Clothing: [
    { name: 'brand', label: 'Brand', placeholder: 'e.g. Zara, Nike' },
    { name: 'size', label: 'Size', placeholder: 'e.g. M, L, XL' },
    { name: 'color', label: 'Color', placeholder: 'e.g. Black' },
    { name: 'material', label: 'Material', placeholder: 'e.g. Cotton, Denim' },
    { name: 'fit', label: 'Fit', placeholder: 'e.g. Regular, Slim' },
    { name: 'usageDuration', label: 'Usage Duration', placeholder: 'e.g. 6 months' },
    { name: 'gender', label: 'Gender', placeholder: 'e.g. Men, Women, Unisex' },
  ],

  Bags: [
    { name: 'brand', label: 'Brand', placeholder: 'e.g. Nike, Adidas' },
    { name: 'bagType', label: 'Bag Type', placeholder: 'e.g. Backpack, Handbag' },
    { name: 'material', label: 'Material', placeholder: 'e.g. Leather, Canvas' },
    { name: 'color', label: 'Color', placeholder: 'e.g. Black' },
    { name: 'size', label: 'Size', placeholder: 'e.g. Small, Medium, Large' },
    { name: 'compartments', label: 'Compartments', placeholder: 'e.g. 3 compartments' },
    { name: 'usageDuration', label: 'Usage Duration', placeholder: 'e.g. 1 year' },
  ],

  Books: [
    { name: 'title', label: 'Book Title', placeholder: 'Enter book title' },
    { name: 'author', label: 'Author', placeholder: 'Enter author name' },
    { name: 'publisher', label: 'Publisher', placeholder: 'Enter publisher name' },
    { name: 'language', label: 'Language', placeholder: 'e.g. Arabic, English' },
    { name: 'pages', label: 'Pages', placeholder: 'e.g. 250 pages' },
    { name: 'edition', label: 'Edition', placeholder: 'e.g. First edition' },
  ],

  'Home Decor': [
    { name: 'material', label: 'Material', placeholder: 'e.g. Glass, Wood' },
    { name: 'color', label: 'Color', placeholder: 'e.g. White' },
    { name: 'dimensions', label: 'Dimensions', placeholder: 'e.g. 30 x 40 cm' },
    { name: 'weight', label: 'Weight', placeholder: 'e.g. 500 g' },
    { name: 'style', label: 'Style', placeholder: 'e.g. Modern, Minimalist' },
  ],
}


// Compress image before saving
function compressImage(file, maxSize = 800) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new Image()

      img.onload = () => {
        const scale = Math.min(
          1,
          maxSize / Math.max(img.width, img.height)
        )

        const canvas = document.createElement('canvas')

        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)

        const context = canvas.getContext('2d')

        if (!context) {
          resolve(reader.result)
          return
        }

        context.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        )

        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }

      img.onerror = () => resolve(reader.result)
      img.src = reader.result
    }

    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })
}


export default function AddItem() {
  const { addItem, user } = useApp()

  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [photo, setPhoto] = useState(null)
  const [dragging, setDragging] = useState(false)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('Like New')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')

  const [specifications, setSpecifications] = useState({})
  const [errors, setErrors] = useState({})


  // Handle uploaded image
  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Please choose an image file.',
      }))
      return
    }

    setErrors((prev) => ({
      ...prev,
      photo: undefined,
    }))

    const compressedImage = await compressImage(file)

    setPhoto(compressedImage)
  }


  // Handle drag and drop
  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)

    handleFile(e.dataTransfer.files?.[0])
  }


  // Handle specification inputs
  const handleSpecificationChange = (field, value) => {
    setSpecifications((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  // Submit product
  const onSubmit = (e) => {
    e.preventDefault()

    const next = {}

    if (!photo) {
      next.photo = 'Please upload a product photo.'
    }

    if (!name.trim()) {
      next.name = 'Please enter the product name.'
    }

    if (!category) {
      next.category = 'Please choose a category.'
    }

    if (!location.trim()) {
      next.location = 'Please enter the product location.'
    }

    if (
      price !== '' &&
      (Number(price) < 0 || Number.isNaN(Number(price)))
    ) {
      next.price = 'Please enter a valid positive price.'
    }

    setErrors(next)

    if (Object.keys(next).length > 0) {
      return
    }


    const numericPrice = price === '' ? 0 : Number(price)


    // Remove empty specification fields
    const filledSpecifications = Object.fromEntries(
      Object.entries(specifications).filter(
        ([, value]) => value.trim() !== ''
      )
    )


    // Save product
    addItem({
      name: name.trim(),
      category,
      condition,
      description: description.trim(),
      location: location.trim(),
      price: numericPrice,
      type: numericPrice > 0 ? 'sale' : 'donate',
      photo,
      specifications: filledSpecifications,
    })


    navigate('/profile', {
      state: { published: true },
    })
  }


  // Redirect if user is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          notice: 'Please log in to sell an item.',
        }}
      />
    )
  }


  const currentFields = CATEGORY_FIELDS[category] || []


  return (
    <section className="container ru-page">

      <h1 className="ru-serif ru-page-title">
        Sell Your Item
      </h1>


      <form
        className="ru-form-card"
        onSubmit={onSubmit}
        noValidate
      >

        <h2 className="ru-serif">
          Sell your Item
        </h2>

        <p className="ru-form-sub">
          Take a step towards sustainability
        </p>


        {/* Product Photo */}
        <label className="ru-label">
          Product photo
        </label>

        <div
          className={`ru-drop mb-3 ${dragging ? 'dragging' : ''}`}
          role="button"
          tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileRef.current?.click()
            }
          }}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >

          {photo ? (
            <>
              <img
                src={photo}
                alt="Product Preview"
                className="ru-drop-preview"
              />

              <button
                type="button"
                className="ru-drop-remove"
                onClick={(e) => {
                  e.stopPropagation()

                  setPhoto(null)

                  if (fileRef.current) {
                    fileRef.current.value = ''
                  }
                }}
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <span className="d-inline-flex align-items-center gap-2 fw-medium">
                <ImagePlus size={22} />
                Upload photo
              </span>

              <small>
                or drag and drop here
              </small>
            </>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

        </div>

        {errors.photo && (
          <div className="ru-error mb-2">
            {errors.photo}
          </div>
        )}


        {/* Product Name and Category */}
        <div className="row g-3 mb-3">

          <div className="col-md-6">

            <label className="ru-label" htmlFor="name">
              Product name
            </label>

            <input
              id="name"
              className={`ru-input ${errors.name ? 'is-invalid' : ''}`}
              placeholder="e.g. Wooden chair"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <div className="ru-error">
                {errors.name}
              </div>
            )}

          </div>


          <div className="col-md-6">

            <label className="ru-label" htmlFor="category">
              Category
            </label>

            <div className="position-relative">

              <select
                id="category"
                className={`ru-input ${errors.category ? 'is-invalid' : ''}`}
                style={{
                  appearance: 'none',
                  paddingRight: '2.2rem',
                }}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setSpecifications({})
                }}
              >

                <option value="">
                  Select category
                </option>

                {CATEGORIES.map((itemCategory) => (
                  <option
                    key={itemCategory}
                    value={itemCategory}
                  >
                    {itemCategory}
                  </option>
                ))}

              </select>

              <ChevronDown
                size={18}
                className="position-absolute"
                style={{
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />

            </div>

            {errors.category && (
              <div className="ru-error">
                {errors.category}
              </div>
            )}

          </div>

        </div>


        {/* Condition */}
        <label className="ru-label">
          Condition
        </label>

        <div className="ru-pills mb-3">

          {CONDITIONS.map((itemCondition) => (
            <button
              type="button"
              key={itemCondition}
              className={`ru-pill ${
                condition === itemCondition ? 'active' : ''
              }`}
              aria-pressed={condition === itemCondition}
              onClick={() => setCondition(itemCondition)}
            >
              {itemCondition}
            </button>
          ))}

        </div>


        {/* Location */}
        <label className="ru-label" htmlFor="location">
          Location
        </label>

        <input
          id="location"
          className={`ru-input mb-3 ${
            errors.location ? 'is-invalid' : ''
          }`}
          placeholder="e.g. Assiut, Cairo, Giza"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {errors.location && (
          <div className="ru-error mb-3">
            {errors.location}
          </div>
        )}


        {/* Category Specific Details */}
        {category && (
          <div className="mb-3">

            <h3 className="ru-serif mb-1">
              Additional Details
            </h3>

            <p className="ru-form-sub mb-3">
              Add more information to help people know your item better.
              All fields are optional.
            </p>

            <div className="row g-3">

              {currentFields.map((field) => (
                <div
                  className="col-md-6"
                  key={field.name}
                >

                  <label
                    className="ru-label"
                    htmlFor={`spec-${field.name}`}
                  >
                    {field.label}
                  </label>

                  <input
                    id={`spec-${field.name}`}
                    className="ru-input"
                    placeholder={field.placeholder}
                    value={specifications[field.name] || ''}
                    onChange={(e) =>
                      handleSpecificationChange(
                        field.name,
                        e.target.value
                      )
                    }
                  />

                </div>
              ))}

            </div>

          </div>
        )}


        {/* Description */}
        <label className="ru-label" htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          className="ru-input mb-3"
          placeholder="Describe your item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        {/* Price */}
        <label className="ru-label" htmlFor="price">
          Price (EGP)
        </label>

        <input
          id="price"
          type="number"
          min="0"
          inputMode="numeric"
          className={`ru-input ${errors.price ? 'is-invalid' : ''}`}
          placeholder="e.g. 250 EGP"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {errors.price && (
          <div className="ru-error">
            {errors.price}
          </div>
        )}

        <div className="form-text mb-3">
          Leave it empty or 0 to donate the item.
        </div>


        {/* Publish Button */}
        <button
          type="submit"
          className="btn ru-btn ru-publish"
        >
          Publish Item
        </button>

      </form>

    </section>
  )
}
