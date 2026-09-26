import { api } from './api'
import type { RoadmapItem } from '../types'

export const roadmapService = {
    getAll: () => api.get<RoadmapItem[]>('/api/roadmap'),
    getById: (id: number) => api.get<RoadmapItem>(`/api/roadmap/${id}`),
    create: (item: Omit<RoadmapItem, 'id'>) => api.post<RoadmapItem>('/api/roadmap', item),
    update: (id: number, item: RoadmapItem) => api.put<void>(`/api/roadmap/${id}`, item),
    delete: (id: number) => api.delete<void>(`/api/roadmap/${id}`),
}