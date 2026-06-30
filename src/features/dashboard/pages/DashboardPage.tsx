import { useGetPlansQuery } from '@services/plansApi'
import { useGetSubscribersQuery } from '@services/subscribersApi'
import { useGetSubscriptionsQuery } from '@services/subscriptionsApi'
import LoadingSpinner from '@components/LoadingSpinner'

export default function DashboardPage() {
  const { data: plans = [], isLoading: plansLoading } = useGetPlansQuery()
  const { data: subscribers = [], isLoading: subscribersLoading } = useGetSubscribersQuery()
  const { data: subscriptions = [], isLoading: subscriptionsLoading } = useGetSubscriptionsQuery()

  const isLoading = plansLoading || subscribersLoading || subscriptionsLoading

  // Calculate metrics
  const activePlans = plans.filter((p) => p.active).length
  const totalRevenue = subscriptions.reduce((acc, sub) => {
    const plan = plans.find((p) => p.id === sub.plan_id)
    return acc + (plan?.price || 0)
  }, 0)
  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active').length

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container-main py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Active Plans */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Planos Ativos</p>
              <p className="text-3xl font-bold text-gray-900">{activePlans}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Total Subscribers */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Assinantes</p>
              <p className="text-3xl font-bold text-gray-900">{subscribers.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646M3 20.394c0-2.208 1.794-4 4.004-4h9.992c2.21 0 4.004 1.792 4.004 4v.586H3v-.586z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Active Subscriptions */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Assinaturas Ativas</p>
              <p className="text-3xl font-bold text-gray-900">{activeSubscriptions}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Receita Total</p>
              <p className="text-3xl font-bold text-gray-900">R$ {totalRevenue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Subscriptions */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Assinaturas Recentes</h2>
          {subscriptions.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma assinatura yet</p>
          ) : (
            <ul className="space-y-3">
              {subscriptions.slice(0, 5).map((sub) => {
                const subscriber = subscribers.find((s) => s.id === sub.subscriber_id)
                const plan = plans.find((p) => p.id === sub.plan_id)
                return (
                  <li key={sub.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{subscriber?.name}</p>
                      <p className="text-gray-500">{plan?.name}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {sub.status}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Recent Plans */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Planos</h2>
          {plans.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum plano yet</p>
          ) : (
            <ul className="space-y-3">
              {plans.slice(0, 5).map((plan) => (
                <li key={plan.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{plan.name}</p>
                    <p className="text-gray-500">R$ {plan.price.toFixed(2)} / {plan.billing_cycle}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {plan.active ? 'Ativo' : 'Inativo'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
