import { useState } from 'react'
import { useGetSubscriptionsQuery } from '@services/subscriptionsApi'
import { useGetPaymentsQuery, useCreatePaymentMutation, useUpdatePaymentMutation } from '@services/paymentsApi'
import { useGetPlansQuery } from '@services/plansApi'
import { useGetSubscribersQuery } from '@services/subscribersApi'
import { useNotification } from '@hooks/useNotification'
import { useI18n } from '@hooks/useI18n'
import Modal from '@components/Modal'
import LoadingSpinner from '@components/LoadingSpinner'
import { mapApiError } from '@utils/errorMapper'
import type { CreatePaymentRequest } from '../../../types'

export default function PaymentsPage() {
  const t = useI18n()
  const { show: showNotification } = useNotification()
  const { data: subscriptionsData } = useGetSubscriptionsQuery()
  const { data: plansData } = useGetPlansQuery()
  const { data: subscribersData } = useGetSubscribersQuery()
  const subscriptions = Array.isArray(subscriptionsData) ? subscriptionsData : []
  const plans = Array.isArray(plansData) ? plansData : []
  const subscribers = Array.isArray(subscribersData) ? subscribersData : []
  const [createPayment] = useCreatePaymentMutation()
  const [updatePayment] = useUpdatePaymentMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')

  const [formData, setFormData] = useState({
    subscription_id: '',
    amount: '',
    status: 'pending' as 'paid' | 'pending' | 'failed' | 'refunded',
    gateway_transaction_id: '',
  })

  // Fetch payments for selected subscription
  const { data: paymentsData, isLoading } = useGetPaymentsQuery(
    selectedSubscriptionId || '',
    { skip: !selectedSubscriptionId }
  )
  const payments = Array.isArray(paymentsData) ? paymentsData : []

  const handleOpenModal = (subscriptionId?: string) => {
    setFormError('')
    if (subscriptionId) {
      const plan = plans.find((p) => p.id === subscriptions.find((s) => s.id === subscriptionId)?.plan_id)
      setFormData({
        subscription_id: subscriptionId,
        amount: plan?.price.toString() || '',
        status: 'paid',
        gateway_transaction_id: '',
      })
    } else {
      setFormData({
        subscription_id: '',
        amount: '',
        status: 'paid',
        gateway_transaction_id: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.subscription_id || !formData.amount) {
      setFormError(t('validation.requiredFields'))
      return
    }

    try {
      const data: CreatePaymentRequest = {
        subscription_id: formData.subscription_id,
        amount: parseFloat(formData.amount),
      }
      if (formData.gateway_transaction_id) {
        data.gateway_transaction_id = formData.gateway_transaction_id
      }
      await createPayment(data).unwrap()
      showNotification(t('success.paymentCreated'), 'success')
      handleCloseModal()
    } catch (err: any) {
      const errorMsg = mapApiError(err)
      setFormError(errorMsg)
      showNotification(errorMsg, 'error')
    }
  }

  const handleStatusChange = async (paymentId: string, newStatus: string) => {
    try {
      await updatePayment({
        id: paymentId,
        status: newStatus,
      }).unwrap()
      showNotification(t('success.paymentUpdated'), 'success')
    } catch (err: any) {
      const errorMsg = mapApiError(err)
      showNotification(errorMsg, 'error')
    }
  }

  if (isLoading && selectedSubscriptionId) return <LoadingSpinner />

  return (
    <div className="container-main py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pagamentos</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Registrar Pagamento
        </button>
      </div>

      <div className="mb-6">
        <label className="label">Filtrar por Assinatura</label>
        <select
          value={selectedSubscriptionId || ''}
          onChange={(e) => setSelectedSubscriptionId(e.target.value || null)}
          className="input-field max-w-md"
        >
          <option value="">Todas as assinaturas</option>
          {subscriptions.map((sub) => {
            const subscriber = subscribers.find((s) => s.id === sub.subscriber_id)
            const plan = plans.find((p) => p.id === sub.plan_id)
            return (
              <option key={sub.id} value={sub.id}>
                {subscriber?.name} - {plan?.name}
              </option>
            )
          })}
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Assinante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Plano</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => {
                const sub = subscriptions.find((s) => s.id === payment.subscription_id)
                const subscriber = subscribers.find((s) => s.id === sub?.subscriber_id)
                const plan = plans.find((p) => p.id === sub?.plan_id)
                return (
                  <tr key={payment.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{subscriber?.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{plan?.name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      R$ {payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={payment.status}
                        onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="paid">Pago</option>
                        <option value="pending">Pendente</option>
                        <option value="failed">Falhou</option>
                        <option value="refunded">Reembolsado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payment.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenModal(payment.subscription_id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Novo para esta
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && selectedSubscriptionId && (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">Nenhum pagamento yet</p>
          </div>
        )}

        {!selectedSubscriptionId && (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">Selecione uma assinatura acima</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} title="Registrar Pagamento" onClose={handleCloseModal}>
        {formError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Assinatura *</label>
            <select
              value={formData.subscription_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, subscription_id: e.target.value }))}
              className="input-field"
            >
              <option value="">Selecione uma assinatura</option>
              {subscriptions.filter((s) => s.status === 'active').map((sub) => {
                const subscriber = subscribers.find((s) => s.id === sub.subscriber_id)
                const plan = plans.find((p) => p.id === sub.plan_id)
                return (
                  <option key={sub.id} value={sub.id}>
                    {subscriber?.name} - {plan?.name}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label className="label">Valor *</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
              className="input-field"
              placeholder="99.99"
            />
          </div>

          <div>
            <label className="label">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
              className="input-field"
            >
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="failed">Falhou</option>
            </select>
          </div>

          <div>
            <label className="label">ID Transação Gateway</label>
            <input
              type="text"
              value={formData.gateway_transaction_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, gateway_transaction_id: e.target.value }))}
              className="input-field"
              placeholder="opcional"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button type="submit" className="btn-primary flex-1">
              Registrar
            </button>
            <button type="button" onClick={handleCloseModal} className="btn-secondary flex-1">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
