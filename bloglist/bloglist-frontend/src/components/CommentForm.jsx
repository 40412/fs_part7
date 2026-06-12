import { useState } from "react"
import { addComment } from "../services/blogs"
import useBlogStore from "../stores/blogStore"

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
    <form onSubmit={handleAddComment}>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">add comment</button>
    </form>
  )
}
