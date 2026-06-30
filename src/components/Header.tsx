import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-main flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">
            {user?.store_name || 'Minha Assinatura'}
          </h1>
        </div>

        <nav className="flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Dashboard
          </Link>
          <Link to="/dashboard/plans" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Planos
          </Link>
          <Link to="/dashboard/subscribers" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Assinantes
          </Link>
          <Link to="/dashboard/subscriptions" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Assinaturas
          </Link>
          <Link to="/dashboard/payments" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
            Pagamentos
          </Link>

          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            >
              Sair
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
