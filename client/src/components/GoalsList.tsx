import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { differenceInCalendarDays, format, formatDistanceStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Target, Clock, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../libs/utils'
import { goalsService } from '../services/goals'
import type { Goal, GoalStatus } from '../types'

const STATUS_LABEL: Record<GoalStatus, string> = {
    Planejado: 'Planejado',
    EmProgresso: 'Em progresso',
    Concluido: 'Concluído',
}

const STATUS_BADGE: Record<GoalStatus, string> = {
    Planejado: 'bg-[#F5F2E8] dark:bg-[#1E1E27] text-[#5B5646] dark:text-[#C4C4C4]',
    EmProgresso: 'bg-[#F7C6D9]/40 dark:bg-[#F7C6D9]/10 text-[#9C4C6C] dark:text-[#F7C6D9]',
    Concluido: 'bg-[#B7E0C0]/50 dark:bg-[#B7E0C0]/10 text-[#3D7A4C] dark:text-[#8FD69E]',
}

const PRIORITY_BADGE: Record<Goal['priority'], string> = {
    Baixa: 'bg-[#B7E0C0]/50 dark:bg-[#B7E0C0]/10 text-[#3D7A4C] dark:text-[#8FD69E]',
    Media: 'bg-[#F6D374]/40 dark:bg-[#F6D374]/10 text-[#8A6D2E] dark:text-[#F6D374]',
    Alta: 'bg-[#F09995]/40 dark:bg-[#F09995]/10 text-[#B0433C] dark:text-[#F09995]',
}

const FILTERS: { label: string; value: GoalStatus | 'Todos' }[] = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Planejado', value: 'Planejado' },
    { label: 'Em progresso', value: 'EmProgresso' },
    { label: 'Concluído', value: 'Concluido' },
]

export function GoalsList() {
    const [filter, setFilter] = useState<GoalStatus | 'Todos'>('Todos')

    const {
        data: goals = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['goals'],
        queryFn: () => goalsService.getAll(),
    })

    useEffect(() => {
        if (isError) toast.error('Não foi possível carregar as metas.')
    }, [isError])

    const total = goals.length
    const emProgresso = goals.filter((g) => g.status === 'EmProgresso').length
    const concluidas = goals.filter((g) => g.status === 'Concluido').length

    const filtered = useMemo(
        () => (filter === 'Todos' ? goals : goals.filter((g) => g.status === filter)),
        [goals, filter]
    )

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <span className="text-xs font-semibold tracking-wide text-[#E88FB0] dark:text-[#F2A9C4] uppercase">
                Planejamento
            </span>
            <h2 className="text-3xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mt-1">Metas com Prazos</h2>
            <p className="text-[#8F8878] dark:text-[#C4C4C4] mt-2 max-w-2xl">
                Objetivos técnicos definidos com datas específicas, prioridades e status de progresso para manter meu
                desenvolvimento focado e mensurável.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] px-5 py-4">
                    <span className="w-11 h-11 rounded-xl bg-[#F7C6D9]/40 dark:bg-[#F7C6D9]/10 flex items-center justify-center text-[#9C4C6C] dark:text-[#F7C6D9]">
                        <Target size={20} />
                    </span>
                    <div>
                        <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A]">Total de Metas</p>
                        <p className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5]">{total}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] px-5 py-4">
                    <span className="w-11 h-11 rounded-xl bg-[#F6D374]/40 dark:bg-[#F6D374]/10 flex items-center justify-center text-[#8A6D2E] dark:text-[#F6D374]">
                        <Clock size={20} />
                    </span>
                    <div>
                        <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A]">Em Progresso</p>
                        <p className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5]">{emProgresso}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] px-5 py-4">
                    <span className="w-11 h-11 rounded-xl bg-[#B7E0C0]/50 dark:bg-[#B7E0C0]/10 flex items-center justify-center text-[#3D7A4C] dark:text-[#8FD69E]">
                        <CheckCircle2 size={20} />
                    </span>
                    <div>
                        <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A]">Concluídas</p>
                        <p className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5]">{concluidas}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
                {FILTERS.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={cn(
                            'text-sm px-4 py-2 rounded-full transition-colors',
                            filter === f.value
                                ? 'font-semibold text-white bg-gradient-to-r from-[#E88FB0] to-[#F6D374]'
                                : 'text-[#5B5646] dark:text-[#C4C4C4] bg-[#F5F2E8] dark:bg-[#1E1E27] hover:bg-[#F0E9D8] dark:hover:bg-[#2A2A35]'
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {isLoading && (
                <div className="flex items-center gap-2 text-sm text-[#8F8878] dark:text-[#9A9A9A] mt-6">
                    <Loader2 size={16} className="animate-spin" /> Carregando metas...
                </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {filtered.map((goal) => {
                    const overdueDays = goal.targetDate
                        ? differenceInCalendarDays(new Date(), new Date(goal.targetDate))
                        : null
                    const isOverdue = goal.status !== 'Concluido' && overdueDays !== null && overdueDays > 0

                    return (
                        <div
                            key={goal.id}
                            className="flex flex-col rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white dark:bg-[#1A1A22] p-5"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <span className="w-9 h-9 shrink-0 rounded-lg bg-[#F6D374]/30 dark:bg-[#F6D374]/10 flex items-center justify-center text-[#8A6D2E] dark:text-[#F6D374]">
                                    <Target size={16} />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-semibold text-[#2B2620] dark:text-[#F2F2F5] leading-snug">{goal.title}</h3>
                                    <p className="text-xs text-[#B0A98F] dark:text-[#9A9A9A]">{goal.category}</p>
                                </div>
                            </div>

                            <p className="text-sm text-[#8F8878] dark:text-[#C4C4C4] line-clamp-2">{goal.description}</p>

                            <div className="mt-4 h-1.5 rounded-full bg-[#F5F2E8] dark:bg-[#2A2A35] overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#F6D374] to-[#F7C6D9]"
                                    style={{ width: `${goal.progressPercent}%` }}
                                />
                            </div>
                            <p className="text-xs text-[#B0A98F] dark:text-[#9A9A9A] mt-1.5">{goal.progressPercent}% concluído</p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${PRIORITY_BADGE[goal.priority]}`}>
                                    {goal.priority === 'Media' ? 'Média' : goal.priority}
                                </span>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${STATUS_BADGE[goal.status]}`}>
                                    {STATUS_LABEL[goal.status]}
                                </span>
                            </div>

                            {goal.status === 'Concluido' ? (
                                <p className="flex items-center gap-1.5 text-xs font-medium text-[#3D7A4C] dark:text-[#8FD69E] mt-3">
                                    <CheckCircle2 size={14} /> Meta concluída
                                </p>
                            ) : isOverdue ? (
                                <p className="flex items-center gap-1.5 text-xs font-medium text-[#B0433C] dark:text-[#F09995] mt-3">
                                    <AlertTriangle size={14} /> Prazo vencido há{' '}
                                    {formatDistanceStrict(new Date(goal.targetDate!), new Date(), { locale: ptBR })}
                                </p>
                            ) : goal.targetDate ? (
                                <p className="text-xs text-[#B0A98F] dark:text-[#9A9A9A] mt-3">
                                    Prazo: {format(new Date(goal.targetDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </p>
                            ) : null}
                        </div>
                    )
                })}
            </div>

            {isError && (
                <p className="text-sm text-[#B0433C] dark:text-[#F09995] mt-6">
                    Não foi possível carregar as metas agora. Tenta de novo em instantes.
                </p>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
                <p className="text-sm text-[#B0A98F] dark:text-[#9A9A9A] mt-6">Nenhuma meta encontrada nesse filtro.</p>
            )}
        </section>
    )
}