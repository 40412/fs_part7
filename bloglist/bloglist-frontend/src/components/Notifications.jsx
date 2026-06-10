import "../index.css"
import useNotificationStore from "../stores/notificationStore"

export const Notification = () => {
  const notification = useNotificationStore((s) => s.notification)

  if (!notification) return null

  const style = {
    padding: 10,
    border: "2px solid",
    borderColor: notification.type === "error" ? "red" : "green",
    marginBottom: 10,
  }

  if (!notification) return null

  return <div style={style}>{notification.text}</div>
}
