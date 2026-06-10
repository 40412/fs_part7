// components/LogoutButton.jsx
import { useContext } from "react"
import { AuthContext } from "../context/authcontext"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import useAuthStore from "../stores/authStore"

const LogoutButton = () => {
  /* const { logout } = useContext(AuthContext); */
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div>
      <Button variant="contained" onClick={handleLogout}>
        logout
      </Button>
    </div>
  )
}

export default LogoutButton
