import { useEffect, useContext, useState } from "react"
import { LoginForm } from "./components/login"
import { AuthContext } from "./context/authcontext"
import { BlockList } from "./components/BlogList"
import LogoutButton from "./components/LogOutButton"
import BlogForm from "./components/BlogForm"
import { Notification } from "./components/Notifications"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom"
import Navigation from "./components/Navigation"
import Blog from "./components/BlogDetail"
import ErrorBoundary from "./components/ErrorBoundary"
import { NotFound } from "./components/NotFound"
import useAuthStore from "./stores/authStore"
import useBlogStore from "./stores/blogStore"
import { UserList } from "./components/UserList"
import { UserDetail } from "./components/UserDetail"

const App = () => {
  const loadUserFromStorage = useAuthStore((s) => s.loadUserFromStorage)
  const blogs = useBlogStore((state) => state.blogs)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)

  /* useEffect(() => {
    const savedUser = window.localStorage.getItem("loggedUser")
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      login(parsed)
    }
  }, []) */

  useEffect(() => {
    loadUserFromStorage()
  }, [loadUserFromStorage])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  /* const showNotification = (text, type = "success") => {
    setNotification({ text, type })
    setTimeout(() => setNotification(null), 5000)
  } */

  return (
    <Router>
      <Navigation />
      <Notification />
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<BlockList blogs={blogs} />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
          <Route path="/new" element={<BlogForm />}></Route>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App
