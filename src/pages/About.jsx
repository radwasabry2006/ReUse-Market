
import { Link } from 'react-router-dom'
import {
  Leaf,
  Recycle,
  HeartHandshake,
  Users,
  ArrowRight,
  Globe
} from 'lucide-react'

export default function About() {
  return (
    <section className="ru-page">
      <div className="container py-5">

        {/* Hero Section */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 750 }}>
          <div className="mb-3 text-success">
            <Leaf size={48} />
          </div>

          <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2 mb-3">
            About ReUse Market
          </span>

          <h1 className="ru-serif display-5 fw-bold mb-3">
            Give Your Things a <span className="text-success">Second Life</span>
          </h1>

          <p className="text-muted fs-5">
            ReUse Market is a platform that makes it easier to sell,
            donate, and discover pre-loved items. We believe that
            one person's unused item can become another person's treasure.
          </p>
        </div>

        {/* Mission */}
        <div className="row align-items-center g-5 mb-5 py-4">
          <div className="col-lg-6">
            <div className="rounded-4 p-5 text-center"
              style={{ backgroundColor: '#eaf4ed', minHeight: 280 }}>
              <Recycle size={100} className="text-success mb-3" />
              <h3 className="fw-bold">Reuse. Share. Make a Difference.</h3>
              <p className="text-muted mb-0">
                Small actions can create a more sustainable future.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <h2 className="ru-serif fw-bold mb-3">Our Mission</h2>
            <p className="text-muted">
              Our mission is to give useful items a second chance instead
              of letting them go to waste.
            </p>
            <p className="text-muted">
              Through ReUse Market, users can sell items they no longer
              need, donate things to people who need them, and find
              affordable pre-loved products.
            </p>
            <p className="text-muted">
              We want to encourage a community where sharing and
              reusing become easier for everyone.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-4">
          <h2 className="ru-serif fw-bold">What We Believe In</h2>
          <p className="text-muted">
            The values behind everything we do.
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <Recycle size={42} className="text-success mx-auto mb-3" />
              <h5 className="fw-bold">Sustainability</h5>
              <p className="text-muted mb-0">
                Encouraging reuse and reducing unnecessary waste.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <HeartHandshake size={42} className="text-success mx-auto mb-3" />
              <h5 className="fw-bold">Giving & Sharing</h5>
              <p className="text-muted mb-0">
                Making it easier to donate useful items and help others.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
              <Users size={42} className="text-success mx-auto mb-3" />
              <h5 className="fw-bold">Community</h5>
              <p className="text-muted mb-0">
                Connecting people through buying, selling, and donating.
              </p>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="rounded-4 p-4 p-md-5 text-center"
          style={{ backgroundColor: '#eaf4ed' }}>
          <Globe size={38} className="text-success mb-3" />
          <h2 className="ru-serif fw-bold mb-3">
            Be Part of the Change
          </h2>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: 600 }}>
            Start exploring, share something you no longer need,
            or give an item a new home.
          </p>

          <Link to="/explore" className="btn ru-btn px-4 py-2">
            Explore Products <ArrowRight size={18} className="ms-2" />
          </Link>
        </div>

      </div>
    </section>
  )
}
