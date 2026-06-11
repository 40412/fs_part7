import { useState, useEffect } from "react"
import userService from "../services/persons"
import { Link } from "react-router-dom"

export const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(setUsers)
  }, [])

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.username}</td>
              <td>{u.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
