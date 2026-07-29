export interface Profile {
    id: number
    name: string
    title: string
    subtitle: string
    company: string
    area: string
    githubUrl: string
    linkedinUrl: string
    bio: string
    lastUpdate: string
}

export interface Goal {
    id: number
    title: string
    description: string
    isCompleted: boolean
    targetDate: string | null
}

export interface RoadmapItem {
    id: number
    technology: string
    status: string
    order: number
}

export interface Contribution {
    id: number
    title: string
    description: string
    url: string | null
    date: string
}

export interface SoftSkill {
    id: number
    name: string
    level: number
}