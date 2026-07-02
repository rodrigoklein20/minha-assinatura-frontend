import { useState, useCallback } from 'react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationData {
  id: string
  message: string
  type: NotificationType
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  const show = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    const notification: NotificationData = { id, message, type }

    setNotifications((prev) => [...prev, notification])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)

    return id
  }, [])

  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return { notifications, show, remove }
}

interface NotificationContainerProps {
  notifications: NotificationData[]
  onRemove: (id: string) => void
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const bgColor = {
          success: 'bg-green-50 text-green-800 border-green-200',
          error: 'bg-red-50 text-red-800 border-red-200',
          info: 'bg-blue-50 text-blue-800 border-blue-200',
          warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        }[notification.type]

        const iconColor = {
          success: 'text-green-600',
          error: 'text-red-600',
          info: 'text-blue-600',
          warning: 'text-yellow-600',
        }[notification.type]

        return (
          <div
            key={notification.id}
            className={`${bgColor} border rounded-lg p-4 shadow-lg max-w-sm flex items-start gap-3 animate-in fade-in slide-in-from-right-4 duration-200`}
          >
            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default useNotification
