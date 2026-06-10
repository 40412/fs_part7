import { create } from "zustand"

const useNotificationStore = create((set) => ({
  notification: null,

  showNotification: (text, type = "success") => {
    set({ notification: { text, type } })
    setTimeout(() => {
      set({ notification: null })
    }, 5000)
  },

  clearNotification: () => set({ notification: null }),
}))

export default useNotificationStore
