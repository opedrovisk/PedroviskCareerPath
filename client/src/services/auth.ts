import { api } from './api'

interface LoginResponse {
  token: string
  expiresAt: string
}

export const authService = {
  login: async (password: string) => {
    const response = await api.post<LoginResponse>('/api/auth/login', { password })
    localStorage.setItem('token', response.token)
    return response
  },
  logout: () => {
    localStorage.removeItem('token')
  },
  isLoggedIn: () => {
    return !!localStorage.getItem('token')
  },
}