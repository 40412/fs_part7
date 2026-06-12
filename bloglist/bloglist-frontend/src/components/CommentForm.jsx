import { useState } from "react"
import { addComment } from "../services/blogs"
import useBlogStore from "../stores/blogStore"
import { Box, Button, TextField } from "@mui/material"

export const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("")
  const updateBlog = useBlogStore((state) => state.updateBlog)

  const handleAddComment = async (event) => {
    event.preventDefault()
    const updated = await addComment(blogId, comment)
    setComment("")
    updateBlog(updated)
  }

  return (
    <Box
      component="form"
      onSubmit={handleAddComment}
      sx={{ display: "flex", gap: 2, mt: 2 }}
    >
      <TextField
        label="Add a comment"
        variant="outlined"
        size="small"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </Box>
  )
}
