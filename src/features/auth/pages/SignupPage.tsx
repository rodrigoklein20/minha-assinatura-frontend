import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useI18n } from '@hooks/useI18n'
import useNotification, { NotificationContainer } from '@hooks/useNotification'
import { validators } from '@utils/validators'

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
  const t = useI18n()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    // Validações obrigatórias
    if (!formData.name) {
      setLocalError(t('validation.nameRequired'))
      return
    }

    if (!formData.email) {
      setLocalError(t('validation.emailRequired'))
      return
    }

    if (!validators.isValidEmail(formData.email)) {
      setLocalError(t('validation.emailInvalid'))
      return
    }

    if (!formData.password) {
      setLocalError(t('validation.passwordRequired'))
      return
    }

    if (!validators.isValidPassword(formData.password)) {
      setLocalError(t('validation.passwordMinLength'))
      return
    }

    if (!formData.store_name) {
      setLocalError(t('validation.storeNameRequired'))
      return
    }

    if (!formData.store_link) {
      setLocalError(t('validation.storeLinkRequired'))
      return
    }

    if (!validators.isValidStoreLink(formData.store_link)) {
      setLocalError(t('validation.storeLinkInvalid'))
      return
    }

    // Validação opcional: telefone (se preenchido, deve ser válido)
    if (formData.phone && !validators.isValidPhone(formData.phone)) {
      setLocalError(t('validation.phoneInvalid'))
      return
    }

    try {
      await signup(formData)
      show(t('success.signupSuccess'), 'success')
    } catch (err: any) {
      const errorMsg = err?.message || t('errors.DEFAULT')
      setLocalError(errorMsg)
      show(errorMsg, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4 py-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.signup.title')}</h1>
        <p className="text-gray-600 mb-6">{t('auth.signup.subtitle')}</p>

        {localError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{localError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              {t('auth.signup.name')} <span className="text-red-500">*</span>
            </label>
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
            <label className="label">
              {t('auth.signup.email')} <span className="text-red-500">*</span>
            </label>
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
            <label className="label">
              {t('auth.signup.password')} <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
          </div>

          <div>
            <label className="label">
              {t('auth.signup.phone')} <span className="text-gray-400 text-xs">({t('auth.signup.optional')})</span>
            </label>
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
            <label className="label">
              {t('auth.signup.storeName')} <span className="text-red-500">*</span>
            </label>
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
            <label className="label">
              {t('auth.signup.storeLink')} <span className="text-red-500">*</span>
            </label>
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
            <p className="text-xs text-gray-500 mt-1">Apenas letras, números, hífen e underscore</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('auth.signup.loading') : t('auth.signup.button')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t('auth.signup.hasAccount')}{' '}
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            {t('auth.signup.login')}
          </Link>
        </p>
      </div>

      <NotificationContainer notifications={notifications} onRemove={remove} />
    </div>
  )
}
