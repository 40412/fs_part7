import { useNavigate, useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/authcontext"
import { modify, remove } from "../services/blogs"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Link,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import useAuthStore from "../stores/authStore"
import useNotificationStore from "../stores/notificationStore"
import useBlogStore from "../stores/blogStore"
import { CommentForm } from "./CommentForm"

const Blog = ({ blogs, setBlogs }) => {
  const { id } = useParams()
  /* const { user } = useContext(AuthContext); */
  const user = useAuthStore((s) => s.user)
  const [likes, setLikes] = useState(0)
  const navigate = useNavigate()
  const notify = useNotificationStore((s) => s.showNotification)
  const removeBlog = useBlogStore((state) => state.removeBlog)

  const blog = blogs.find((b) => b.id === id)

  useEffect(() => {
    const getLikes = () => {
      const blog = blogs.find((b) => b.id === id)
      if (blog) {
        setLikes(blog.likes)
      }
    }

    getLikes()
  }, [])

  if (!blog) return null

  const likeBlog = async (id) => {
    if (user) {
      await modify(id, { likes: 1 })
      setLikes(likes + 1)
      notify(`Liked ${blog.title}`)
    }
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        removeBlog(blog.id)
        notify("Blog removed", "success")
        //setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
        navigate("/")
      } catch (e) {
        console.log("error removing blog", e)
      }
    }
  }

  const canRemove = user && blog.user && blog.user.username === user.username

  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          {blog.title} | {blog.author}
        </Typography>

        <Link
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ display: "block", mb: 2 }}
        >
          {blog.url}
        </Link>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body1">{likes} likes</Typography>

          {user && (
            <Button
              variant="contained"
              size="small"
              onClick={() => likeBlog(blog.id)}
            >
              like
            </Button>
          )}
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          added by {blog.user?.name}
        </Typography>

        <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Comments
          </Typography>

          <CommentForm blogId={blog.id} />

          <List>
            {blog.comments.map((c, i) => (
              <ListItem key={i} divider sx={{ py: 1 }}>
                <ListItemText primary={c} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {canRemove && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleRemoveBlog(blog.id)}
          >
            remove
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog
