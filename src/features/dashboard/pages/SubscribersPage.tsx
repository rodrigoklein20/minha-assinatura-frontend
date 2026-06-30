import { useState } from 'react'
import { useGetSubscribersQuery, useCreateSubscriberMutation, useUpdateSubscriberMutation, useDeleteSubscriberMutation } from '@services/subscribersApi'
import useNotification, { NotificationContainer } from '@hooks/useNotification'
import Modal from '@components/Modal'
import LoadingSpinner from '@components/LoadingSpinner'
import type { Subscriber, CreateSubscriberRequest, UpdateSubscriberRequest } from '../../../types'

export default function SubscribersPage() {
  const { data: subscribers = [], isLoading } = useGetSubscribersQuery()
  const [createSubscriber] = useCreateSubscriberMutation()
  const [updateSubscriber] = useUpdateSubscriberMutation()
  const [deleteSubscriber] = useDeleteSubscriberMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null)
  const [formError, setFormError] = useState('')
  const { notifications, show, remove } = useNotification()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleOpenModal = (subscriber?: Subscriber) => {
    if (subscriber) {
      setEditingSubscriber(subscriber)
      setFormData({
        name: subscriber.name,
        email: subscriber.email || '',
        phone: subscriber.phone || '',
      })
    } else {
      setEditingSubscriber(null)
      setFormData({ name: '', email: '', phone: '' })
    }
    setFormError('')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSubscriber(null)
    setFormError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.name) {
      setFormError('Nome é obrigatório')
      return
    }

    try {
      if (editingSubscriber) {
        const data: UpdateSubscriberRequest = { name: formData.name }
        if (formData.email) data.email = formData.email
        if (formData.phone) data.phone = formData.phone
        await updateSubscriber({ id: editingSubscriber.id, data }).unwrap()
        show('Assinante atualizado!', 'success')
      } else {
        const data: CreateSubscriberRequest = { name: formData.name }
        if (formData.email) data.email = formData.email
        if (formData.phone) data.phone = formData.phone
        await createSubscriber(data).unwrap()
        show('Assinante criado!', 'success')
      }
      handleCloseModal()
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Erro ao salvar'
      setFormError(errorMsg)
      show(errorMsg, 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Deletar este assinante?')) {
      try {
        await deleteSubscriber(id).unwrap()
        show('Assinante deletado!', 'success')
      } catch (err: any) {
        show(err?.data?.error || 'Erro ao deletar', 'error')
      }
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container-main py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Assinantes</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Novo Assinante
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Data</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sub.email || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sub.phone || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(sub.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(sub)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {subscribers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Nenhum assinante yet</p>
            <button onClick={() => handleOpenModal()} className="btn-primary">
              Adicionar Primeiro Assinante
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        title={editingSubscriber ? 'Editar Assinante' : 'Novo Assinante'}
        onClose={handleCloseModal}
      >
        {formError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="João Silva"
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="input-field"
              placeholder="joao@email.com"
            />
          </div>

          <div>
            <label className="label">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="input-field"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button type="submit" className="btn-primary flex-1">
              {editingSubscriber ? 'Atualizar' : 'Criar'}
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
