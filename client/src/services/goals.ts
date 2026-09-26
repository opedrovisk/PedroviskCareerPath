import { api } from './api'
import type { Goal } from '../types'

export const goalsService = {
    getAll: () => api.get<Goal[]>('/api/goals'),
    create: (goal: Omit<Goal, 'id'>) => api.post<Goal>('/api/goals', goal),
    update: (id: number, goal: Goal) => api.put<void>(`/api/goals/${id}`, goal),
    delete: (id: number) => api.delete<void>(`/api/goals/${id}`),
}