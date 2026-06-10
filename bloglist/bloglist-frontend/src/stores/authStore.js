import { create } from "zustand"
import { setToken } from "../services/token"
import { getUser, removeUser, saveUser } from "../services/persistenUser"

const useAuthStore = create((set) => ({
  user: null,

  login: (userData) => {
    saveUser(userData)
    set({ user: userData })
    setToken(userData.token)
  },

  logout: () => {
    removeUser()
    set({ user: null })
    setToken(null)
  },

  loadUserFromStorage: () => {
    const saved = getUser()
    if (saved) {
      const user = JSON.parse(saved)
      set({ user })
      setToken(user.token)
    }
  },
}))

export default useAuthStore
