import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-2">Página Não Encontrada</p>
        <p className="text-gray-600 mb-8">A página que você procura não existe.</p>

        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            Ir para Home
          </Link>
          <Link to="/auth/login" className="btn-secondary">
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  )
}
