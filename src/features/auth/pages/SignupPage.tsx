import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import useNotification, { NotificationContainer } from '@hooks/useNotification'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    store_name: '',
    store_link: '',
  })
  const [localError, setLocalError] = useState('')
  const { signup, loading } = useAuth()
  const { notifications, show, remove } = useNotification()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!formData.name || !formData.email || !formData.password || !formData.store_name || !formData.store_link) {
      setLocalError('Preencha todos os campos obrigatórios')
      return
    }

    if (formData.password.length < 6) {
      setLocalError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    try {
      await signup(formData)
      show('Cadastro realizado com sucesso!', 'success')
    } catch (err: any) {
      const errorMsg = err?.data?.error || 'Erro ao cadastrar'
      setLocalError(errorMsg)
      show(errorMsg, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4 py-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Crie sua conta</h1>
        <p className="text-gray-600 mb-6">Comece sua jornada como profissional</p>

        {localError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{localError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nome *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Seu nome"
              disabled={loading}
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
              placeholder="seu@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="label">Senha *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div>
            <label className="label">Nome da Loja *</label>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              className="input-field"
              placeholder="Meu Negócio"
              disabled={loading}
            />
          </div>

          <div>
            <label className="label">URL da Loja *</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">/store/</span>
              <input
                type="text"
                name="store_link"
                value={formData.store_link}
                onChange={handleChange}
                className="input-field"
                placeholder="seu-nome"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Faça login
          </Link>
        </p>
      </div>

      <NotificationContainer notifications={notifications} onRemove={remove} />
    </div>
  )
}
