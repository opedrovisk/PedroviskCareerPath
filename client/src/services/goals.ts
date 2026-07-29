import { api } from './api'
import type { Profile } from '../types'

export const profileService = {
    getAll: () => api.get<Profile[]>('/api/profile'),
    getById: (id: number) => api.get<Profile>(`/api/profile/${id}`),
    create: (profile: Omit<Profile, 'id'>) => api.post<Profile>('/api/profile', profile),
    update: (id: number, profile: Profile) => api.put<void>(`/api/profile/${id}`, profile),
    delete: (id: number) => api.delete<void>(`/api/profile/${id}`),
}