import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../services/persons"

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
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      {user.blogs.length === 0 && <div>No blogs added</div>}

      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}
