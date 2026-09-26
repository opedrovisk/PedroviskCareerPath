import { api } from './api'
import type { Contribution } from '../types'

export const contributionsService = {
    getAll: () => api.get<Contribution[]>('/api/contributions'),
    getById: (id: number) => api.get<Contribution>(`/api/contributions/${id}`),
    create: (item: Omit<Contribution, 'id'>) => api.post<Contribution>('/api/contributions', item),
    update: (id: number, item: Contribution) => api.put<void>(`/api/contributions/${id}`, item),
    delete: (id: number) => api.delete<void>(`/api/contributions/${id}`),
}