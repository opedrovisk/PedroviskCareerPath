import { api } from './api'
import type { SoftSkill } from '../types'

export const softSkillsService = {
    getAll: () => api.get<SoftSkill[]>('/api/softskills'),
    getById: (id: number) => api.get<SoftSkill>(`/api/softskills/${id}`),
    create: (item: Omit<SoftSkill, 'id'>) => api.post<SoftSkill>('/api/softskills', item),
    update: (id: number, item: SoftSkill) => api.put<void>(`/api/softskills/${id}`, item),
    delete: (id: number) => api.delete<void>(`/api/softskills/${id}`),
}