import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"
import useNotificationStore from "../stores/notificationStore"
import useBlogStore from "../stores/blogStore"

const BlogForm = ({ setblogs, showNotification, onCreate = () => {} }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()
  const notify = useNotificationStore((s) => s.showNotification)
  const createBlog = useBlogStore((state) => state.createBlog)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }

    try {
      onCreate(newBlog)
      createBlog(newBlog)
      //setblogs((blogs) => [...blogs, result])
      /* showNotification(
        `New Blog, ${result.title} by ${result.author} created!`,
        "success",
      ); */
      notify(
        `New Blog, ${newBlog.title} by ${newBlog.author} created!`,
        "success",
      )
      navigate("/")
    } catch (e) {
      /* showNotification(e.message, "error") */
      notify(e.message, "error")
    }

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new</h3>

      <Box style={{ margin: 10 }}>
        title:
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Box>

      <div style={{ margin: 10 }}>
        author:
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>

      <div style={{ margin: 10 }}>
        url:
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <Button variant="outlined" style={{ margin: 10 }} type="submit">
        create
      </Button>
    </form>
  )
}

export default BlogForm
