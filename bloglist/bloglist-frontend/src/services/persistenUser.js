const STORAGE_KEY = "loggedBlogappUser"

export const getUser = () => {
  const json = window.localStorage.getItem(STORAGE_KEY)
  if (!json) return null
  try {
    return json
  } catch {
    return null
  }
}

export const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}
