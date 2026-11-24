import { Recycle } from 'lucide-react'

// Decorative globe + sprout used in the "Simple Steps" section.
export default function Globe() {
  return (
    <div className="ru-globe">
      <svg viewBox="0 0 260 240" role="img" aria-label="Green planet">
        <defs>
          <radialGradient id="globeGrad" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#9bd491" />
            <stop offset="1" stopColor="#2c8a58" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="222" rx="95" ry="12" fill="#e6dcc4" opacity=".7" />
        <circle cx="140" cy="112" r="92" fill="url(#globeGrad)" />
        <g fill="#2a7d52" opacity=".6">
          <path d="M96 44 C118 36 142 44 138 62 C134 78 112 74 104 88 C96 100 80 96 78 80 C76 64 84 50 96 44Z" />
          <path d="M150 96 C170 86 196 96 192 118 C188 138 170 140 160 158 C150 172 134 160 138 140 C142 124 136 108 150 96Z" />
          <path d="M176 52 C192 48 208 58 204 72 C200 84 184 84 176 76 C170 68 170 56 176 52Z" />
          <path d="M84 120 C98 114 112 124 106 140 C100 154 84 152 78 140 C74 132 76 124 84 120Z" />
        </g>
        <g fill="#6fb36b">
          <path d="M60 196 C58 150 52 120 38 96 C70 100 88 130 60 196Z" />
          <path d="M62 190 C70 160 92 140 118 138 C112 168 90 188 62 190Z" />
          <path d="M44 170 C20 160 8 140 8 120 C32 124 46 144 44 170Z" />
        </g>
      </svg>
      <span className="ru-globe-badge">
        <Recycle size={44} strokeWidth={2.2} />
      </span>
    </div>
  )
}
