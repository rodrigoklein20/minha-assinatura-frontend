import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken, setUser, logout as logoutAction } from '@features/auth/authSlice'
import { useLoginMutation, useSignupMutation } from '@services/authApi'
import { mapApiError } from '@utils/errorMapper'
import type { RootState } from '@app/store'
import type { LoginRequest, SignupRequest } from '../types'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user, loading, error } = useSelector((state: RootState) => state.auth)

  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation()
  const [signupMutation, { isLoading: signupLoading }] = useSignupMutation()

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const response = await loginMutation(credentials).unwrap()
        dispatch(setToken(response.token))
        dispatch(setUser(response.user))
        navigate('/dashboard')
        return response
      } catch (err) {
        console.error('Login error:', err)
        const friendlyMessage = mapApiError(err)
        const error = new Error(friendlyMessage)
        throw error
      }
    },
    [loginMutation, dispatch, navigate]
  )

  const signup = useCallback(
    async (data: SignupRequest) => {
      try {
        const response = await signupMutation(data).unwrap()
        dispatch(setToken(response.token))
        dispatch(setUser(response.user))
        navigate('/dashboard')
        return response
      } catch (err) {
        console.error('Signup error:', err)
        const friendlyMessage = mapApiError(err)
        const error = new Error(friendlyMessage)
        throw error
      }
    },
    [signupMutation, dispatch, navigate]
  )

  const logout = useCallback(() => {
    dispatch(logoutAction())
    navigate('/auth/login')
  }, [dispatch, navigate])

  const isAuthenticated = !!token && !!user

  return {
    token,
    user,
    loading: loading || loginLoading || signupLoading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
  }
}
