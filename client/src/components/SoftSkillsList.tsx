import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    Loader2,
    ListChecks,
    BookOpen,
    Users,
    Zap,
    FileText,
    MessageCircle,
    Puzzle,
    Compass,
    Clock,
    Sparkles,
} from 'lucide-react'
import { toast } from 'sonner'
import { softSkillsService } from '../services/softSkills'
import type { SoftSkill, SoftSkillStatus } from '../types'

const ICON_BY_NAME: Record<string, typeof Sparkles> = {
    organização: ListChecks,
    'aprendizado contínuo': BookOpen,
    'trabalho em equipe': Users,
    proatividade: Zap,
    documentação: FileText,
    comunicação: MessageCircle,
    'resolução de problemas': Puzzle,
    'liderança técnica': Compass,
    'gestão de tempo': Clock,
}

function iconFor(name: string) {
    return ICON_BY_NAME[name.toLowerCase()] ?? Sparkles
}

const SECTIONS: { status: SoftSkillStatus; eyebrow: string; title: string; subtitle: string; badge: string }[] = [
    {
        status: 'Practicing',
        eyebrow: 'Habilidades',
        title: 'Já pratico',
        subtitle: 'Soft skills que aplico no meu dia a dia profissional.',
        badge: 'Já pratico',
    },
    {
        status: 'Developing',
        eyebrow: 'Em evolução',
        title: 'Em desenvolvimento',
        subtitle: 'Habilidades em construção contínua.',
        badge: 'Em evolução',
    },
]

export function SoftSkillsList() {
    const {
        data: skills = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['softSkills'],
        queryFn: () => softSkillsService.getAll(),
    })

    useEffect(() => {
        if (isError) toast.error('Não foi possível carregar as soft skills.')
    }, [isError])

    const grouped = useMemo(() => {
        const map = new Map<SoftSkillStatus, SoftSkill[]>()
        for (const skill of skills) {
            const list = map.get(skill.status) ?? []
            list.push(skill)
            map.set(skill.status, list)
        }
        return map
    }, [skills])

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <span className="text-xs font-semibold tracking-wide text-[#E88FB0] dark:text-[#F2A9C4] uppercase">
                Comportamental
            </span>
            <h2 className="text-3xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mt-1">Soft Skills</h2>
            <p className="text-[#8F8878] dark:text-[#C4C4C4] mt-2 max-w-2xl">
                As habilidades humanas que sustentam minha evolução técnica.
            </p>

            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-[#8F8878] dark:text-[#9A9A9A] mt-6">
                    <Loader2 size={16} className="animate-spin" /> Carregando soft skills...
                </div>
            )}

            {SECTIONS.map((section) => {
                const items = grouped.get(section.status) ?? []
                if (isLoading || items.length === 0) return null

                return (
                    <div key={section.status} className="mt-12 first:mt-8">
                        <span className="text-xs font-semibold tracking-wide text-[#E88FB0] dark:text-[#F2A9C4] uppercase">
                            {section.eyebrow}
                        </span>
                        <h3 className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mt-1">{section.title}</h3>
                        <p className="text-[#8F8878] dark:text-[#C4C4C4] mt-2 max-w-2xl">{section.subtitle}</p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                            {items.map((skill) => {
                                const Icon = iconFor(skill.name)
                                return (
                                    <div
                                        key={skill.id}
                                        className="rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] p-6"
                                    >
                                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#B7E0C0]/40 dark:bg-[#B7E0C0]/10 text-[#3D7A4C] dark:text-[#8FD69E]">
                                            <Icon size={18} />
                                        </span>
                                        <h4 className="font-semibold text-[#2B2620] dark:text-[#F2F2F5] mt-4">
                                            {skill.name}
                                        </h4>
                                        <p className="text-sm text-[#8F8878] dark:text-[#C4C4C4] mt-2">
                                            {skill.description}
                                        </p>
                                        <span className="inline-block mt-4 text-xs font-medium px-3 py-1 rounded-full bg-[#B7E0C0]/40 dark:bg-[#B7E0C0]/10 text-[#3D7A4C] dark:text-[#8FD69E]">
                                            {section.badge}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

            {isError && (
                <p className="text-sm text-[#B0433C] dark:text-[#F09995] mt-6">
                    Não foi possível carregar as soft skills agora. Tenta de novo em instantes.
                </p>
            )}

            {!isLoading && !isError && skills.length === 0 && (
                <p className="text-sm text-[#B0A98F] dark:text-[#9A9A9A] mt-6">Nenhuma soft skill cadastrada ainda.</p>
            )}
        </section>
    )
}