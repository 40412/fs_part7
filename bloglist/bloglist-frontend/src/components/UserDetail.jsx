import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../services/persons"
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material"

export const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getAll().then((users) => {
      const found = users.find((u) => u.id === id)
      setUser(found)
    })
  }, [id])

  if (!user) return <div>loading...</div>

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {user.name}
      </Typography>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Added blogs
      </Typography>

      {user.blogs.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          No blogs added
        </Typography>
      )}

      {user.blogs.length > 0 && (
        <List>
          {user.blogs.map((b, i) => (
            <Box key={b.id}>
              <ListItem sx={{ py: 1 }}>
                <ListItemText primary={b.title} />
              </ListItem>
              {i < user.blogs.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Paper>
  )
}
