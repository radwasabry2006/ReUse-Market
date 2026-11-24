
import { useMemo, useState } from "react";
import {
  Search,
  Heart,
  MapPin,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { popularItems } from "../data/popularItems.js";

const categories = [
  "All",
  "Clothing",
  "Furniture",
  "Bags",
  "Books",
  "Home Decor",
  "Electronics",
  'Home Appliances',
];

export default function Explore() {
  const {
    user,
    favorites,
    toggleFavorite,
    cart,
    toggleCart,
    items,
  } = useApp();

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const needLogin = (message) => {
    navigate("/login", { state: { notice: message } });
  };

  // Combine default products and user-added products
  const allItems = useMemo(
    () => [...items, ...popularItems],
    [items]
  );

  const filteredItems = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    const result = allItems.filter((item) => {
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(searchText);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      result.sort(
        (a, b) =>
          (b.added || b.id || 0) - (a.added || a.id || 0)
      );
    }

    return result;
  }, [allItems, query, category, sort]);

  return (
    <section className="ru-section explore-page">
      <div className="container">
        <div className="ru-sec-head">
          <div className="ru-sec-title">
            <div>
              <p className="ru-eyebrow">Find your next favorite</p>
              <h1 className="ru-serif">Explore Products</h1>
              <p>
                Discover pre-loved items and give them a new home.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="d-flex flex-column flex-md-row gap-3 mb-4">
          <div className="flex-grow-1 position-relative">
            <Search
              size={20}
              className="position-absolute top-50 start-0 translate-middle-y ms-3"
            />

            <input
              type="search"
              className="form-control ps-5"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ maxWidth: "220px" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Categories */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categories.map((item) => (
            <button
              key={item}
              className={`btn ${
                category === item
                  ? "ru-btn"
                  : "ru-btn ru-btn-outline"
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Products */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="ru-serif">No products found</h3>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <div className="row g-3 g-lg-4">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              const inCart = cart.some(
                (c) => c.id === item.id
              );

              return (
                <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
                  <article className="ru-card">
                    <div className="ru-card-img">
                      <img
                        src={item.photo || item.image}
                        alt={item.name}
                      />

                      <span
                        className={`ru-tag ${
                          item.type === "sale"
                            ? "ru-tag-sale"
                            : "ru-tag-donate"
                        }`}
                      >
                        {item.type === "sale" ? "For Sale" : "Donate"}
                      </span>

                      <button
                        className="ru-fav"
                        aria-label="Toggle favorite"
                        onClick={() =>
                          user
                            ? toggleFavorite(item.id)
                            : needLogin(
                                "Please log in to save favorites."
                              )
                        }
                      >
                        <Heart
                          size={18}
                          fill={isFav ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="ru-card-body">
                      <h3 className="ru-card-name">{item.name}</h3>

                      <p className="ru-card-price">
                        {item.price > 0
                          ? `EGP ${item.price}`
                          : "Free"}
                      </p>

                      <div className="ru-card-meta">
                        <span>
                          <MapPin size={14} />
                          {item.location || "Location not specified"}
                        </span>
                        <span>{item.condition}</span>
                      </div>

                      <div className="ru-card-actions">
                        <Link
                          to={`/product/${item.id}`}
                          className="btn ru-btn"
                          onClick={(e) => {
                            if (!user) {
                              e.preventDefault();
                              needLogin(
                                "Please log in to view item details."
                              );
                            }
                          }}
                        >
                          <Eye size={17} /> View Details
                        </Link>

                        <button
                          className={`ru-icon-btn ${
                            inCart ? "in-cart" : ""
                          }`}
                          onClick={() =>
                            user
                              ? toggleCart(item)
                              : needLogin(
                                  "Please log in to add items to your cart."
                                )
                          }
                        >
                          <ShoppingCart size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
