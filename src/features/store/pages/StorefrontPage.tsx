import { useParams, useNavigate } from 'react-router-dom'
import { useGetStorePlansQuery, useGetStoreQuery } from '@services/storeApi'
import LoadingSpinner from '@components/LoadingSpinner'
import type { StorePlan } from '../../../types'

export default function StorefrontPage() {
  const { store_link } = useParams<{ store_link: string }>()
  const navigate = useNavigate()
  const { data: storeInfo, isLoading: storeLoading } = useGetStoreQuery(store_link || '')
  const { data: storePlans, isLoading: plansLoading } = useGetStorePlansQuery(store_link || '')

  const isLoading = storeLoading || plansLoading

  if (isLoading) return <LoadingSpinner />

  if (!storeInfo || !storePlans) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Loja não encontrada</h1>
          <p className="text-gray-600">A loja que você procura não existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-main py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{storeInfo.store_name}</h1>
          <p className="text-gray-600">{storeInfo.name}</p>
          {storeInfo.phone && (
            <p className="text-sm text-gray-500 mt-2">Telefone: {storeInfo.phone}</p>
          )}
        </div>
      </header>

      {/* Plans */}
      <main className="container-main py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Nossos Planos</h2>

        {storePlans.plans.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-gray-500 text-lg">Nenhum plano disponível no momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storePlans.plans.map((plan: StorePlan) => (
              <div
                key={plan.id}
                className="card overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              >
                {plan.image && (
                  <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover" />
                )}

                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>

                  <div className="mb-4">
                    <p className="text-3xl font-bold text-blue-600">R$ {plan.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">por {plan.billing_cycle}</p>
                  </div>

                  {plan.description && (
                    <p className="text-gray-600 text-sm mb-6 flex-grow">{plan.description}</p>
                  )}

                  <button
                    onClick={() => navigate(`/store/${store_link}/checkout/${plan.id}`)}
                    className="btn-primary w-full"
                  >
                    Contratar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container-main text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {storeInfo.store_name}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
