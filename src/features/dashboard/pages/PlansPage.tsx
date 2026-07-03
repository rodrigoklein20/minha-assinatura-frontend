import { useState } from 'react'
import { useGetPlansQuery, useCreatePlanMutation, useUpdatePlanMutation, useDeletePlanMutation } from '@services/plansApi'
import { useNotification } from '@hooks/useNotification'
import { useI18n } from '@hooks/useI18n'
import Modal from '@components/Modal'
import LoadingSpinner from '@components/LoadingSpinner'
import { mapApiError } from '@utils/errorMapper'
import type { Plan, CreatePlanRequest, UpdatePlanRequest } from '../../../types'

export default function PlansPage() {
  const t = useI18n()
  const { show: showNotification } = useNotification()
  const { data: plansData, isLoading } = useGetPlansQuery()
  const plans = Array.isArray(plansData) ? plansData : []
  const [createPlan] = useCreatePlanMutation()
  const [updatePlan] = useUpdatePlanMutation()
  const [deletePlan] = useDeletePlanMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [formError, setFormError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    billing_cycle: 'monthly',
    description: '',
    image: '',
    active: true,
  })

  const handleOpenModal = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan)
      setFormData({
        name: plan.name,
        slug: plan.slug,
        price: plan.price.toString(),
        billing_cycle: plan.billing_cycle,
        description: plan.description || '',
        image: '',
        active: plan.active,
      })
    } else {
      setEditingPlan(null)
      setFormData({
        name: '',
        slug: '',
        price: '',
        billing_cycle: 'monthly',
        description: '',
        image: '',
        active: true,
      })
    }
    setFormError('')
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPlan(null)
    setFormError('')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.name || !formData.slug || !formData.price) {
      setFormError(t('validation.requiredFields'))
      return
    }

    try {
      if (editingPlan) {
        const updateData: UpdatePlanRequest = {
          name: formData.name,
          slug: formData.slug,
          price: parseFloat(formData.price),
          billing_cycle: formData.billing_cycle,
          description: formData.description,
          active: formData.active,
        }
        if (formData.image && formData.image !== editingPlan.image) {
          updateData.image = formData.image
        }
        await updatePlan({ id: editingPlan.id, data: updateData }).unwrap()
        showNotification(t('success.planUpdated'), 'success')
      } else {
        const createData: CreatePlanRequest = {
          name: formData.name,
          slug: formData.slug,
          price: parseFloat(formData.price),
          billing_cycle: formData.billing_cycle,
          description: formData.description,
          image: formData.image || undefined,
          active: formData.active,
        }
        await createPlan(createData).unwrap()
        showNotification(t('success.planCreated'), 'success')
      }
      handleCloseModal()
    } catch (err: any) {
      const errorMsg = mapApiError(err)
      setFormError(errorMsg)
      showNotification(errorMsg, 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm(t('plans.deleteConfirm'))) {
      try {
        await deletePlan(id).unwrap()
        showNotification(t('success.planDeleted'), 'success')
      } catch (err: any) {
        const errorMsg = mapApiError(err)
        showNotification(errorMsg, 'error')
      }
    }
  }

  const handleToggleActive = async (plan: Plan) => {
    try {
      await updatePlan({
        id: plan.id,
        data: { active: !plan.active },
      }).unwrap()
      showNotification(plan.active ? 'Plano desativado' : 'Plano ativado', 'success')
    } catch (err: any) {
      const errorMsg = mapApiError(err)
      showNotification(errorMsg, 'error')
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container-main py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Planos</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary">
          + Novo Plano
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">Nenhum plano criado ainda</p>
          <button onClick={() => handleOpenModal()} className="btn-primary">
            Criar Primeiro Plano
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="card overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {plan.image ? (
                  <img src={`data:image/png;base64,${plan.image}`} alt={plan.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">
                  R$ {plan.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mb-4">por {plan.billing_cycle}</p>

                {plan.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{plan.description}</p>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {plan.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(plan)}
                    className="btn-secondary flex-1 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleActive(plan)}
                    className="btn-secondary flex-1 text-sm"
                  >
                    {plan.active ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="btn-danger text-sm"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingPlan ? 'Editar Plano' : 'Novo Plano'}
        onClose={handleCloseModal}
        size="lg"
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
              placeholder="ex: Plano Básico"
            />
          </div>

          <div>
            <label className="label">URL (slug) *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              className="input-field"
              placeholder="ex: plano-basico"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Preço *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="input-field"
                placeholder="99.99"
              />
            </div>

            <div>
              <label className="label">Ciclo de Cobrança *</label>
              <select
                value={formData.billing_cycle}
                onChange={(e) => setFormData((prev) => ({ ...prev, billing_cycle: e.target.value }))}
                className="input-field"
              >
                <option value="monthly">Mensal</option>
                <option value="quarterly">Trimestral</option>
                <option value="annually">Anual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="input-field"
              placeholder="Descreva o que o cliente recebe"
              rows={3}
            />
          </div>

          <div>
            <label className="label">Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field"
            />
            {formData.image && (
              <img src={formData.image} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Plano ativo</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button type="submit" className="btn-primary flex-1">
              {editingPlan ? 'Atualizar' : 'Criar'}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
