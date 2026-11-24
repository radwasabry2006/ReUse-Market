import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)

// Small helpers so a full/blocked localStorage never crashes the app.
const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function AppProvider({ children }) {
  // user  = the logged-in person ({ name, email } or null when logged out)
  // users = every registered account (used by Login / Register)
  const [user, setUser] = useState(() => read('reuse_current_user', null))
  const [users, setUsers] = useState(() => read('reuse_users', []))
  const [items, setItems] = useState(() => read('reuse_items', []))
  const [favorites, setFavorites] = useState(() => read('reuse_favorites', []))
  const [cart, setCart] = useState(() => read('reuse_cart', []))

  useEffect(() => {
    write('reuse_current_user', user)
  }, [user])
  useEffect(() => {
    write('reuse_users', users)
  }, [users])
  useEffect(() => {
    write('reuse_items', items)
  }, [items])
  useEffect(() => {
    write('reuse_favorites', favorites)
  }, [favorites])
  useEffect(() => {
    write('reuse_cart', cart)
  }, [cart])

  const login = (account) => setUser(account)
  const logout = () => setUser(null)
const registerUser = (newUser) => {
  setUsers((prevUsers) => {
    const email = newUser.email.trim().toLowerCase()

    const exists = prevUsers.some(
      (user) => user.email.trim().toLowerCase() === email
    )

    if (exists) return prevUsers

    return [...prevUsers, { ...newUser, email }]
  })
}
  const addItem = (item) =>
    setItems((prev) => [{ ...item, id: Date.now(), owner: user?.email }, ...prev])

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  // Adds the item to the cart (click again to take it out)
  
const toggleCart = (item) =>
  setCart((prev) =>
    prev.some((c) => String(c.id) === String(item.id))
      ? prev.filter((c) => String(c.id) !== String(item.id))
      : [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: Number(item.price) || 0,
            image: item.image || item.photo,
            type: item.type,
            category: item.category,
            condition: item.condition,
            location: item.location,
          },
        ],
  )

const clearCart = () => setCart([])


  const toggleFavorite = (id) => {
  setFavorites((prev) => {
    const alreadyFavorite = prev.some(
      (favoriteId) => String(favoriteId) === String(id)
    )

    if (alreadyFavorite) {
      return prev.filter(
        (favoriteId) => String(favoriteId) !== String(id)
      )
    }

    return [...prev, id]
  })
}

  
const value = {
  user,
   login,
    logout, 
    users, 
    setUsers, 
    items, 
    addItem, 
    removeItem,
     registerUser,
  favorites, 
  toggleFavorite, 
  cart, 
  toggleCart, 
  clearCart,
}


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)
