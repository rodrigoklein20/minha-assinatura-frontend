import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetStoreQuery, useGetStorePlansQuery } from '@services/storeApi'
import { useCreateSubscriberMutation } from '@services/subscribersApi'
import { useCreateSubscriptionMutation } from '@services/subscriptionsApi'
import useNotification, { NotificationContainer } from '@hooks/useNotification'
import LoadingSpinner from '@components/LoadingSpinner'
import type { CreateSubscriberRequest, CreateSubscriptionRequest, StorePlan } from '../../../types'

export default function CheckoutPage() {
  const { store_link, plan_id } = useParams<{ store_link: string; plan_id: string }>()
  const navigate = useNavigate()
  const { data: storeInfo, isLoading: storeLoading } = useGetStoreQuery(store_link || '')
  const { data: storePlans, isLoading: plansLoading } = useGetStorePlansQuery(store_link || '')
  const [createSubscriber] = useCreateSubscriberMutation()
  const [createSubscription] = useCreateSubscriptionMutation()
  const { notifications, show, remove } = useNotification()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLoading = storeLoading || plansLoading

  if (isLoading) return <LoadingSpinner />

  const plan = storePlans?.plans.find((p: StorePlan) => p.id === plan_id)

  if (!storeInfo || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Plano não encontrado</h1>
          <button
            onClick={() => navigate(`/store/${store_link}`)}
            className="btn-primary"
          >
            Voltar para Loja
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.name) {
      setFormError('Nome é obrigatório')
      return
    }

    if (!formData.email) {
      setFormError('Email é obrigatório')
      return
    }

    setIsSubmitting(true)

    try {
      // Step 1: Create subscriber
      const subscriberData: CreateSubscriberRequest = {
        name: formData.name,
        email: formData.email,
      }
      if (formData.phone) {
        subscriberData.phone = formData.phone
      }

      const subscriber = await createSubscriber(subscriberData).unwrap()

      // Step 2: Create subscription
      const subscriptionData: CreateSubscriptionRequest = {
        subscriber_id: subscriber.id,
        plan_id: plan.id,
        start_date: new Date().toISOString().split('T')[0],
      }

      await createSubscription(subscriptionData).unwrap()

      show('Assinatura criada com sucesso!', 'success')
      setTimeout(() => {
        navigate(`/store/${store_link}`)
      }, 2000)
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Erro ao criar assinatura'
      setFormError(errorMsg)
      show(errorMsg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan Summary */}
        <div className="card p-8 h-fit sticky top-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

          {plan.image && (
            <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover rounded-lg mb-4" />
          )}

          <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-6">{plan.description}</p>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Valor</span>
              <span className="text-lg font-semibold text-gray-900">R$ {plan.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Ciclo</span>
              <span className="text-gray-900 font-medium">{plan.billing_cycle}</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> O primeiro pagamento deverá ser realizado conforme acordado com {storeInfo.store_name}.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dados da Assinatura</h2>

          {formError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Nome Completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="João Silva"
                disabled={isSubmitting}
                required
              />
            </div>

            <div>
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="joao@email.com"
                disabled={isSubmitting}
                required
              />
            </div>

            <div>
              <label className="label">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="(11) 99999-9999"
                disabled={isSubmitting}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
              <p className="text-sm text-gray-700">
                Ao confirmar, você está concordando em assinar o plano <strong>{plan.name}</strong> por{' '}
                <strong>R$ {plan.price.toFixed(2)} {plan.billing_cycle}</strong>.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processando...' : 'Confirmar Assinatura'}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/store/${store_link}`)}
              className="btn-secondary w-full"
              disabled={isSubmitting}
            >
              Voltar
            </button>
          </form>
        </div>
      </div>

      <NotificationContainer notifications={notifications} onRemove={remove} />
    </div>
  )
}
