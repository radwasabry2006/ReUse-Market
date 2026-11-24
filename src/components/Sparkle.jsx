// The little three-stroke "sparkle" that sits beside section titles.
export default function Sparkle({ size = 30 }) {
  return (
    <svg
      className="ru-sparkle"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M13 4 L18 11" />
      <path d="M5 13 L14 19" />
      <path d="M4 25 L12 27" />
    </svg>
  )
}
