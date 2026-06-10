import { create } from "zustand"
import { createBlog, getAll, remove } from "../services/blogs"

const useBlogStore = create((set) => ({
  blogs: [],

  fetchBlogs: async () => {
    const blogs = await getAll()
    set({ blogs })
  },

  createBlog: async (blogData) => {
    await createBlog(blogData)
    const blogs = await getAll()
    set({ blogs })
  },

  removeBlog: async (id) => {
    await remove(id)
    set((state) => ({
      blogs: state.blogs.filter((b) => b.id !== id),
    }))
  },
}))

export default useBlogStore
