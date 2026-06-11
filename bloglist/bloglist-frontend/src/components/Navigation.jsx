import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authcontext"
import LogoutButton from "./LogOutButton"
import useAuthStore from "../stores/authStore"

const Navigation = () => {
  /* const { user } = useContext(AuthContext); */
  const user = useAuthStore((s) => s.user)

  return (
    <AppBar position="static">
      <Toolbar>
        <h1>Blogs App</h1>

        <Button
          style={{ margin: 10 }}
          variant="contained"
          component={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Blogs
        </Button>

        <Button
          style={{ margin: 10 }}
          variant="contained"
          component={Link}
          to="/users"
          sx={{ textTransform: "none" }}
        >
          Users
        </Button>

        {user && (
          <Button
            style={{ margin: 10 }}
            variant="contained"
            component={Link}
            to="/new"
            sx={{ textTransform: "none" }}
          >
            Create new blog
          </Button>
        )}

        {!user && (
          <Button
            style={{ margin: 10 }}
            variant="contained"
            component={Link}
            to="/login"
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        )}

        {user && <LogoutButton />}

        <Box sx={{ flexGrow: 1 }} />

        {/* <Typography sx={{ marginRight: 2 }}>{user.name} logged in</Typography> */}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
