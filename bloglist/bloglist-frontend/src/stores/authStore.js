import { create } from "zustand"
import { setToken } from "../services/token"

const useAuthStore = create((set) => ({
  user: null,

  login: (userData) => {
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData))
    set({ user: userData })
    setToken(userData.token)
  },

  logout: () => {
    window.localStorage.removeItem("loggedBlogUser")
    set({ user: null })
    setToken(null)
  },

  loadUserFromStorage: () => {
    const saved = window.localStorage.getItem("loggedBlogUser")
    if (saved) {
      const user = JSON.parse(saved)
      set({ user })
      setToken(user.token)
    }
  },
}))

export default useAuthStore
