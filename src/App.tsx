import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { store } from '@app/store'
import ProtectedRoute from '@components/ProtectedRoute'
import { NotificationContainer } from '@hooks/useNotification'
import useNotification from '@hooks/useNotification'

// Pages
import LoginPage from '@features/auth/pages/LoginPage'
import SignupPage from '@features/auth/pages/SignupPage'
import DashboardPage from '@features/dashboard/pages/DashboardPage'
import PlansPage from '@features/dashboard/pages/PlansPage'
import SubscribersPage from '@features/dashboard/pages/SubscribersPage'
import SubscriptionsPage from '@features/dashboard/pages/SubscriptionsPage'
import PaymentsPage from '@features/dashboard/pages/PaymentsPage'
import StorefrontPage from '@features/store/pages/StorefrontPage'
import CheckoutPage from '@features/store/pages/CheckoutPage'
import NotFoundPage from '@features/common/pages/NotFoundPage'

// Layout
import Header from '@components/Header'

function AppContent() {
  const { notifications, remove } = useNotification()

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        {/* Store (Public) Routes */}
        <Route path="/store/:store_link" element={<StorefrontPage />} />
        <Route path="/store/:store_link/checkout/:plan_id" element={<CheckoutPage />} />

        {/* Dashboard Routes (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1">
                  <DashboardPage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/plans"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1">
                  <PlansPage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/subscribers"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1">
                  <SubscribersPage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/subscriptions"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1">
                  <SubscriptionsPage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/payments"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1">
                  <PaymentsPage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <NotificationContainer notifications={notifications} onRemove={remove} />
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App
