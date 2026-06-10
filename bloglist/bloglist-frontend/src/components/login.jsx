import { useState, useContext } from "react"
import loginService from "../services/login"
import { AuthContext } from "../context/authcontext"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import useAuthStore from "../stores/authStore"
import useNotificationStore from "../stores/notificationStore"
import { useField } from "../hooks/useField"

export const LoginForm = ({ showNotification }) => {
  /* const { login } = useContext(AuthContext); */
  const login = useAuthStore((s) => s.login)
  const username = useField("text")
  const password = useField("text")
  const navigate = useNavigate()
  const notify = useNotificationStore((s) => s.showNotification)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService({
        username: username.value,
        password: password.value,
      })

      login(user)

      /* showNotification("Successfully logged in", "success") */
      notify("Successfully logged in", "success")

      //setUsername("")
      //setPassword("")
      navigate("/")
    } catch (e) {
      console.log(e)
      /* showNotification("Wrong credentials", "error") */
      notify("Wrong credentials", "error")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ margin: 10 }}>
          username
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div style={{ margin: 10 }}>
          password
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}
