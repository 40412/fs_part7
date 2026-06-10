import { createContext, useState } from "react"
import { setToken } from "../services/token"
import { removeUser, saveUser } from "../services/persistenUser"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    setToken(userData.token)
    saveUser(userData)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    removeUser()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
