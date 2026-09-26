import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../libs/utils'
import { roadmapService } from '../services/roadmap'
import type { RoadmapItem, RoadmapStatus } from '../types'

const STATUS_LABEL: Record<RoadmapStatus, string> = {
    Planned: 'Planejado',
    InProgress: 'Em andamento',
    Completed: 'Concluído',
}

const STATUS_CHIP: Record<RoadmapStatus, string> = {
    Completed:
        'bg-[#B7E0C0]/50 dark:bg-[#B7E0C0]/10 border-[#B7E0C0] dark:border-[#B7E0C0]/20 text-[#3D7A4C] dark:text-[#8FD69E]',
    InProgress:
        'bg-[#F6D374]/30 dark:bg-[#F6D374]/10 border-[#F0DFA0] dark:border-[#F6D374]/20 text-[#8A6D2E] dark:text-[#F6D374]',
    Planned:
        'bg-[#F5F2E8] dark:bg-[#1E1E27] border-[#F0EAD8] dark:border-[#2A2A35] text-[#5B5646] dark:text-[#C4C4C4]',
}

const STATUS_DOT: Record<RoadmapStatus, string> = {
    Completed: 'bg-[#3D7A4C] dark:bg-[#8FD69E]',
    InProgress: 'bg-[#8A6D2E] dark:bg-[#F6D374]',
    Planned: 'bg-[#B0A98F] dark:bg-[#9A9A9A]',
}

const STATUS_ORDER: RoadmapStatus[] = ['Completed', 'InProgress', 'Planned']

export function RoadmapList() {
    const {
        data: items = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['roadmap'],
        queryFn: () => roadmapService.getAll(),
    })

    useEffect(() => {
        if (isError) toast.error('Não foi possível carregar o roadmap.')
    }, [isError])

    const groups = useMemo(() => {
        const map = new Map<string, RoadmapItem[]>()
        for (const item of items) {
            const key = item.category || 'Sem categoria'
            const list = map.get(key) ?? []
            list.push(item)
            map.set(key, list)
        }
        return Array.from(map, ([category, list]) => ({ category, items: list }))
    }, [items])

    const counts = useMemo(
        () =>
            STATUS_ORDER.map((status) => ({
                status,
                total: items.filter((item) => item.status === status).length,
            })),
        [items]
    )

    const total = items.length
    const completed = items.filter((item) => item.status === 'Completed').length

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <span className="text-xs font-semibold tracking-wide text-[#E88FB0] dark:text-[#F2A9C4] uppercase">
                Stack
            </span>
            <h2 className="text-3xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mt-1">Roadmap Técnico</h2>
            <p className="text-[#8F8878] dark:text-[#C4C4C4] mt-2 max-w-2xl">
                Tecnologias que pratico, estudo e tenho como próximos passos.
            </p>

            {total > 0 && (
                <div className="mt-8 rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] p-6">
                    <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A]">Tecnologias concluídas</p>
                    <p className="text-3xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mt-1">
                        {completed}
                        <span className="text-base font-medium text-[#B0A98F] dark:text-[#9A9A9A]"> / {total}</span>
                    </p>

                    <div
                        role="img"
                        aria-label={counts.map((c) => `${c.total} ${STATUS_LABEL[c.status].toLowerCase()}`).join(', ')}
                        className="mt-4 flex h-2 rounded-full overflow-hidden bg-[#F5F2E8] dark:bg-[#2A2A35]"
                    >
                        {counts.map((c) => (
                            <div
                                key={c.status}
                                title={`${STATUS_LABEL[c.status]}: ${c.total}`}
                                className={STATUS_DOT[c.status]}
                                style={{ width: `${(c.total / total) * 100}%` }}
                            />
                        ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        {counts.map((c) => (
                            <div key={c.status} className="flex items-center gap-2 text-sm text-[#5B5646] dark:text-[#C4C4C4]">
                                <span className={cn('w-2 h-2 rounded-full', STATUS_DOT[c.status])} />
                                {STATUS_LABEL[c.status]}
                                <span className="font-semibold text-[#2B2620] dark:text-[#F2F2F5]">{c.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-[#8F8878] dark:text-[#9A9A9A] mt-6">
                    <Loader2 size={16} className="animate-spin" /> Carregando roadmap...
                </div>
            )}

            <div className="grid gap-5 mt-6">
                {groups.map((group) => (
                    <div
                        key={group.category}
                        className="rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] p-6"
                    >
                        <h3 className="font-semibold text-[#2B2620] dark:text-[#F2F2F5]">{group.category}</h3>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {group.items.map((item) => (
                                <span
                                    key={item.id}
                                    title={STATUS_LABEL[item.status]}
                                    className={cn(
                                        'inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border',
                                        STATUS_CHIP[item.status]
                                    )}
                                >
                                    <span className={cn('w-1.5 h-1.5 rounded-full', STATUS_DOT[item.status])} />
                                    {item.technology}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isError && (
                <p className="text-sm text-[#B0433C] dark:text-[#F09995] mt-6">
                    Não foi possível carregar o roadmap agora. Tenta de novo em instantes.
                </p>
            )}

            {!isLoading && !isError && items.length === 0 && (
                <p className="text-sm text-[#B0A98F] dark:text-[#9A9A9A] mt-6">Nenhuma tecnologia cadastrada ainda.</p>
            )}
        </section>
    )
}