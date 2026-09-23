import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../libs/utils'
import { contributionsService } from '../services/contributions'
import type { Contribution, ContributionStatus } from '../types'

const STATUS_LABEL: Record<ContributionStatus, string> = {
    InProgress: 'Em andamento',
    Completed: 'Concluído',
}

const STATUS_BADGE: Record<ContributionStatus, string> = {
    InProgress:
        'bg-[#F6D374]/30 dark:bg-[#F6D374]/10 border-[#F0DFA0] dark:border-[#F6D374]/20 text-[#8A6D2E] dark:text-[#F6D374]',
    Completed:
        'bg-[#B7E0C0]/50 dark:bg-[#B7E0C0]/10 border-[#B7E0C0] dark:border-[#B7E0C0]/20 text-[#3D7A4C] dark:text-[#8FD69E]',
}

function toList(value: string) {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
}

export function ContributionsList() {
    const {
        data: items = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['contributions'],
        queryFn: () => contributionsService.getAll(),
    })

    useEffect(() => {
        if (isError) toast.error('Não foi possível carregar as contribuições.')
    }, [isError])

    const categories = useMemo(() => {
        const set = new Set(items.map((item) => item.category).filter(Boolean))
        return ['Todas', ...Array.from(set)]
    }, [items])

    const [activeCategory, setActiveCategory] = useState('Todas')

    const filtered = useMemo(
        () => (activeCategory === 'Todas' ? items : items.filter((item) => item.category === activeCategory)),
        [items, activeCategory]
    )

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <span className="text-xs font-semibold tracking-wide text-[#E88FB0] dark:text-[#F2A9C4] uppercase">
                Projetos & Estudos
            </span>
            <h2 className="text-3xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mt-1">Contribuições</h2>
            <p className="text-[#8F8878] dark:text-[#C4C4C4] mt-2 max-w-2xl">
                Coleção de projetos, estudos e participações que constroem minha jornada.
            </p>

            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-[#8F8878] dark:text-[#9A9A9A] mt-6">
                    <Loader2 size={16} className="animate-spin" /> Carregando contribuições...
                </div>
            )}

            {categories.length > 1 && (
                <div className="flex flex-wrap gap-2 mt-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                'text-sm font-medium px-4 py-1.5 rounded-full transition-colors',
                                category === activeCategory
                                    ? 'bg-gradient-to-r from-[#F6D374] to-[#F7C6D9] text-[#2B2620]'
                                    : 'bg-[#F5F2E8] dark:bg-[#1E1E27] text-[#5B5646] dark:text-[#C4C4C4] hover:bg-[#F0EAD8] dark:hover:bg-[#2A2A35]'
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 items-start">
                {filtered.map((item) => {
                    const tags = toList(item.tags)
                    const impacts = toList(item.impacts)

                    return (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] p-6"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold text-[#2B2620] dark:text-[#F2F2F5]">
                                        {item.url ? (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="hover:underline"
                                            >
                                                {item.title}
                                            </a>
                                        ) : (
                                            item.title
                                        )}
                                    </h3>
                                    {item.category && (
                                        <p className="text-xs font-medium text-[#E88FB0] dark:text-[#F2A9C4] mt-1">
                                            {item.category}
                                        </p>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'shrink-0 text-xs font-medium px-3 py-1 rounded-full border',
                                        STATUS_BADGE[item.status]
                                    )}
                                >
                                    {STATUS_LABEL[item.status]}
                                </span>
                            </div>

                            <p className="text-sm text-[#8F8878] dark:text-[#C4C4C4] mt-3">{item.description}</p>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5F2E8] dark:bg-[#1E1E27] text-[#5B5646] dark:text-[#C4C4C4]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {impacts.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-semibold tracking-wide text-[#B0A98F] dark:text-[#9A9A9A] uppercase">
                                        Impactos
                                    </p>
                                    <ul className="mt-2 space-y-1">
                                        {impacts.map((impact) => (
                                            <li
                                                key={impact}
                                                className="text-sm text-[#5B5646] dark:text-[#C4C4C4] pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-[#E88FB0] dark:before:bg-[#F2A9C4]"
                                            >
                                                {impact}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {isError && (
                <p className="text-sm text-[#B0433C] dark:text-[#F09995] mt-6">
                    Não foi possível carregar as contribuições agora. Tenta de novo em instantes.
                </p>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
                <p className="text-sm text-[#B0A98F] dark:text-[#9A9A9A] mt-6">Nenhuma contribuição encontrada.</p>
            )}
        </section>
    )
}