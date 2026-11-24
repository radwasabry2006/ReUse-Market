import { useState } from 'react'
import GoogleLogo from './GoogleLogo.jsx'

// Shown when Firebase is not configured yet: lets you "continue with Google"
// by typing the name + email, so the whole flow can be demonstrated.
export default function GoogleDemoDialog({ onSubmit, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Enter a valid email address.')
    onSubmit({ name: name.trim(), email: email.trim().toLowerCase() })
  }

  return (
    <div className="gdemo-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <form className="gdemo" onClick={(e) => e.stopPropagation()} onSubmit={submit} noValidate>
        <GoogleLogo size={34} />
        <h3>Continue with Google</h3>
        <p>Demo mode: enter the account you want to use.</p>
        <input
          className="input"
          placeholder="Full name"
          aria-label="Google account name"
          value={name}
          onChange={(e) => { setName(e.target.value); setError('') }}
          autoFocus
        />
        <input
          className="input"
          type="email"
          placeholder="Google email"
          aria-label="Google account email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
        />
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn btn-primary btn-block" type="submit">Continue</button>
        <button className="gdemo-cancel" type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  )
}
