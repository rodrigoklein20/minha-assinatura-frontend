import { useState } from 'react'
import { useGetSubscriptionsQuery, useCreateSubscriptionMutation, useCancelSubscriptionMutation } from '@services/subscriptionsApi'
import { useGetPlansQuery } from '@services/plansApi'
import { useGetSubscribersQuery } from '@services/subscribersApi'
import useNotification, { NotificationContainer } from '@hooks/useNotification'
import Modal from '@components/Modal'
import LoadingSpinner from '@components/LoadingSpinner'
import type { CreateSubscriptionRequest } from '../../../types'

export default function SubscriptionsPage() {
  const { data: subscriptions = [], isLoading } = useGetSubscriptionsQuery()
  const { data: plans = [] } = useGetPlansQuery()
  const { data: subscribers = [] } = useGetSubscribersQuery()
  const [createSubscription] = useCreateSubscriptionMutation()
  const [cancelSubscription] = useCancelSubscriptionMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const { notifications, show, remove } = useNotification()

  const [formData, setFormData] = useState({
    subscriber_id: '',
    plan_id: '',
    start_date: new Date().toISOString().split('T')[0],
  })

  const handleOpenModal = () => {
    setFormError('')
    setFormData({
      subscriber_id: '',
      plan_id: '',
      start_date: new Date().toISOString().split('T')[0],
    })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.subscriber_id || !formData.plan_id || !formData.start_date) {
      setFormError('Preencha todos os campos')
      return
    }

    try {
      const data: CreateSubscriptionRequest = {
        subscriber_id: formData.subscriber_id,
        plan_id: formData.plan_id,
        start_date: formData.start_date,
      }
      await createSubscription(data).unwrap()
      show('Assinatura criada!', 'success')
      handleCloseModal()
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Erro ao criar'
      setFormError(errorMsg)
      show(errorMsg, 'error')
    }
  }

  const handleCancel = async (id: string) => {
    if (confirm('Cancelar esta assinatura?')) {
      try {
        await cancelSubscription({ id, data: { reason: 'Cancelamento manual' } }).unwrap()
        show('Assinatura cancelada!', 'success')
      } catch (err: any) {
        show(err?.data?.error || 'Erro ao cancelar', 'error')
      }
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container-main py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Assinaturas</h1>
        <button onClick={handleOpenModal} className="btn-primary">
          + Nova Assinatura
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Assinante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Plano</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data Início</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Próx. Cobrança</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.map((sub) => {
                const subscriber = subscribers.find((s) => s.id === sub.subscriber_id)
                const plan = plans.find((p) => p.id === sub.plan_id)
                return (
                  <tr key={sub.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{subscriber?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{plan?.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sub.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(sub.start_date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {sub.next_billing_date
                        ? new Date(sub.next_billing_date).toLocaleDateString('pt-BR')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {sub.status === 'active' && (
                        <button
                          onClick={() => handleCancel(sub.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {subscriptions.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Nenhuma assinatura yet</p>
            <button onClick={handleOpenModal} className="btn-primary">
              Criar Primeira Assinatura
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} title="Nova Assinatura" onClose={handleCloseModal}>
        {formError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Assinante *</label>
            <select
              value={formData.subscriber_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, subscriber_id: e.target.value }))}
              className="input-field"
            >
              <option value="">Selecione um assinante</option>
              {subscribers.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Plano *</label>
            <select
              value={formData.plan_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, plan_id: e.target.value }))}
              className="input-field"
            >
              <option value="">Selecione um plano</option>
              {plans.filter((p) => p.active).map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} (R$ {plan.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Data de Início *</label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData((prev) => ({ ...prev, start_date: e.target.value }))}
              className="input-field"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button type="submit" className="btn-primary flex-1">
              Criar
            </button>
            <button type="button" onClick={handleCloseModal} className="btn-secondary flex-1">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      <NotificationContainer notifications={notifications} onRemove={remove} />
    </div>
  )
}
