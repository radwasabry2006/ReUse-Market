import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

// Temporary page for links that other teammates are still building.
export default function ComingSoon({ title }) {
  return (
    <section className="container ru-page text-center">
      <div className="ru-empty-card mx-auto" style={{ maxWidth: 560 }}>
        <Leaf size={40} className="mb-3" />
        <h1 className="ru-serif h3">{title}</h1>
        <p className="mb-4 text-muted">This page is coming soon.</p>
        <Link to="/" className="btn ru-btn">
          Back to Home
        </Link>
      </div>
    </section>
  )
}
