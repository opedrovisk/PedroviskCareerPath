import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../libs/utils'
import { contributionsService } from '../services/contributions'
import type { ContributionStatus } from '../types'

const STATUS_LABEL: Record<ContributionStatus, string> = {
    InProgress: 'Em andamento',
    Completed: 'Concluído',
}

const STATUS_BADGE: Record<ContributionStatus, string> = {
    InProgress: 'bg-accent-yellow/30 dark:bg-accent-yellow/10 border-accent-yellow-soft dark:border-accent-yellow/20 text-warning-ink',
    Completed: 'bg-success-soft/50 dark:bg-success-soft/10 border-success-soft dark:border-success-soft/20 text-success',
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
            <span className="text-xs font-semibold tracking-wide text-accent-pink uppercase">
                Projetos & Estudos
            </span>
            <h2 className="text-3xl font-bold text-ink mt-1">Contribuições</h2>
            <p className="text-ink-muted mt-2 max-w-2xl">
                Coleção de projetos, estudos e participações que constroem minha jornada.
            </p>

            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-ink-muted mt-6">
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
                                    ? 'bg-gradient-to-r from-accent-yellow to-accent-pink-soft text-ink-on-accent'
                                    : 'bg-surface-soft text-ink-muted hover:bg-border/60'
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
                            className="rounded-2xl border border-border bg-surface-card p-6"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold text-ink">
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
                                        <p className="text-xs font-medium text-accent-pink mt-1">
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

                            <p className="text-sm text-ink-muted mt-3">{item.description}</p>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-soft text-ink-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {impacts.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">
                                        Impactos
                                    </p>
                                    <ul className="mt-2 space-y-1">
                                        {impacts.map((impact) => (
                                            <li
                                                key={impact}
                                                className="text-sm text-ink-muted pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-accent-pink"
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
                <p className="text-sm text-danger mt-6">
                    Não foi possível carregar as contribuições agora. Tenta de novo em instantes.
                </p>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
                <p className="text-sm text-ink-subtle mt-6">Nenhuma contribuição encontrada.</p>
            )}
        </section>
    )
}
