import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button } from "@mui/material"
import useNotificationStore from "../stores/notificationStore"
import useBlogStore from "../stores/blogStore"
import { useField } from "../hooks/useField"

const BlogForm = ({ setblogs, showNotification, onCreate = () => {} }) => {
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")
  const navigate = useNavigate()
  const notify = useNotificationStore((s) => s.showNotification)
  const createBlog = useBlogStore((state) => state.createBlog)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newBlog = { title: title.value, author: author.value, url: url.value }

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

    /* setTitle("")
    setAuthor("")
    setUrl("") */
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new</h3>

      <Box style={{ margin: 10 }}>
        title:
        <input
          type={title.type}
          value={title.value}
          onChange={title.onChange}
        />
      </Box>

      <div style={{ margin: 10 }}>
        author:
        <input value={author.value} onChange={author.onChange} />
      </div>

      <div style={{ margin: 10 }}>
        url:
        <input value={url.value} onChange={url.onChange} />
      </div>

      <Button variant="outlined" style={{ margin: 10 }} type="submit">
        create
      </Button>
    </form>
  )
}

export default BlogForm
