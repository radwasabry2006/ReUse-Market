// The two-leaf logo shown at the top of the Login / Register card.
export default function LeafMark({ size = 96 }) {
  return (
    <svg
      className="auth-leaf"
      width={size}
      height={(size * 78) / 108}
      viewBox="0 0 108 78"
      aria-hidden="true"
    >
      <path d="M50 76 C16 72 2 46 5 8 C38 11 56 34 50 76Z" fill="#17613f" />
      <path d="M58 76 C60 40 80 12 106 3 C110 40 92 70 58 76Z" fill="#1e7a4e" />
      <path d="M48 70 C40 48 28 30 12 16" stroke="#e8f3e9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M60 70 C64 46 80 24 98 12" stroke="#e8f3e9" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}
