import { Link } from 'react-router-dom'
import { Recycle, Info, Mail, Sprout } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="ru-footer">
      <div className="container ru-footer-inner">
        <div className="ru-brand">
          <span className="ru-logo ru-logo-lg">
            <Recycle size={30} />
          </span>
          <span>
            <span className="ru-brand-name d-block">ReUse Market</span>
            <span className="ru-brand-tag d-block">
              Give your things a second life.
            </span>
          </span>
        </div>

        <span className="ru-footer-sep" />

        <Link to="/about" className="ru-footer-link">
          <Info size={26} strokeWidth={1.6} /> About Us
        </Link>

        <span className="ru-footer-sep" />

        <Link to="/contact" className="ru-footer-link">
          <Mail size={26} strokeWidth={1.6} /> Contact Us
        </Link>

        <span className="ru-footer-sep" />

        <span className="ru-copy">
          <Sprout size={22} /> © 2026 ReUse Market. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
