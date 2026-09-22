export interface Profile {
    id: number
    name: string
    title: string
    subtitle: string
    company: string
    area: string
    githubUrl: string
    linkedinUrl: string
    email?: string
    twitterUrl?: string
    instagramUrl?: string
    websiteUrl?: string
    techStack: string
    pdiStartDate: string
    pdiEndDate: string
    bio: string
    lastUpdate: string
}

export type GoalStatus = 'Planejado' | 'EmProgresso' | 'Concluido'
export type GoalPriority = 'Baixa' | 'Media' | 'Alta'

export interface Goal {
    id: number
    title: string
    description: string
    category: string
    priority: GoalPriority
    status: GoalStatus
    progressPercent: number
    targetDate: string | null
}

export type RoadmapStatus = 'Planned' | 'InProgress' | 'Completed'

export interface RoadmapItem {
    id: number
    technology: string
    category: string
    status: RoadmapStatus
    order: number
}

export interface Contribution {
    id: number
    title: string
    description: string
    url: string | null
    date: string
}

export type SoftSkillStatus = 'Practicing' | 'Developing'

export interface SoftSkill {
    id: number
    name: string
    description: string
    status: SoftSkillStatus
    order: number

}