import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { differenceInMonths, differenceInCalendarDays, addMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from 'sonner'
import { Building2, Briefcase, CalendarRange, Sparkles, Loader2 } from 'lucide-react'
import { profileService } from '../services/profile'
import { AVATAR_URL } from '../libs/constants'

function monthsAndDaysBetween(a: Date, b: Date) {
    if (b <= a) return { months: 0, days: 0 }
    const months = Math.max(0, differenceInMonths(b, a))
    const days = Math.max(0, differenceInCalendarDays(b, addMonths(a, months)))
    return { months, days }
}

export function ProfileHeader() {
    const {
        data: profiles,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getAll(),
    })

    useEffect(() => {
        if (isError) toast.error('Não foi possível carregar o perfil.')
    }, [isError])

    const profile = profiles?.[0]

    if (isLoading) {
        return (
            <header className="flex items-center justify-center gap-2 py-32 text-sm text-ink-muted">
                <Loader2 size={16} className="animate-spin" /> Carregando perfil...
            </header>
        )
    }

    if (!profile) return null

    const stack = profile.techStack
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean)

    const pdiStart = new Date(profile.pdiStartDate)
    const pdiEnd = new Date(profile.pdiEndDate)

    const now = new Date()
    const elapsed = monthsAndDaysBetween(pdiStart, now)
    const remaining = monthsAndDaysBetween(now, pdiEnd)
    const progressPct = Math.min(
        100,
        Math.max(0, ((now.getTime() - pdiStart.getTime()) / (pdiEnd.getTime() - pdiStart.getTime())) * 100)
    )

    return (
        <header className="relative overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-start">
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <img
                            src={AVATAR_URL}
                            alt={profile.name}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-accent-yellow/60"
                        />
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-ink-on-accent bg-accent-yellow/30 border border-accent-yellow/50 rounded-full px-3 py-1 dark:text-accent-yellow dark:bg-accent-yellow/10 dark:border-accent-yellow/30">
                            <Sparkles size={12} /> Plano de Desenvolvimento Individual
                        </span>
                    </div>

                    <h1 className="text-5xl font-bold text-ink tracking-tight leading-tight">
                        Olá, eu sou <span className="text-accent-pink">Pedrovisk</span>
                    </h1>

                    <p className="mt-4 text-xl text-ink font-medium">{profile.title}</p>
                    <p className="text-ink-muted">{profile.subtitle}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {stack.map((tech, i) => (
                            <span
                                key={tech}
                                className={`text-xs font-medium text-ink border rounded-full px-3 py-1 ${i % 2 === 0
                                    ? 'bg-accent-yellow/30 border-accent-yellow-soft'
                                    : 'bg-accent-pink-soft/30 border-accent-pink-soft'
                                    }`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <p className="mt-6 text-ink-muted max-w-xl">{profile.bio}</p>

                    <div className="mt-8 flex gap-3">
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-card border border-border text-ink text-sm font-semibold hover:border-accent-pink hover:text-accent-pink transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-card border border-border text-ink text-sm font-semibold hover:border-accent-pink hover:text-accent-pink transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className="mt-12 rounded-2xl border border-border bg-surface-card/60 backdrop-blur-sm divide-y sm:divide-y-0 sm:divide-x divide-border grid sm:grid-cols-4">
                        <div className="px-5 py-4">
                            <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-ink-subtle uppercase">
                                <Building2 size={12} /> Empresa
                            </p>
                            <p className="text-sm font-semibold text-ink mt-1">{profile.company}</p>
                        </div>
                        <div className="px-5 py-4">
                            <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-ink-subtle uppercase">
                                <Briefcase size={12} /> Área
                            </p>
                            <p className="text-sm font-semibold text-ink mt-1">{profile.area}</p>
                        </div>
                        <div className="px-5 py-4">
                            <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-ink-subtle uppercase">
                                <CalendarRange size={12} /> Tempo decorrido
                            </p>
                            <p className="text-sm font-semibold text-ink mt-1">{elapsed.months}m {elapsed.days}d</p>
                        </div>
                        <div className="px-5 py-4">
                            <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-ink-subtle uppercase">
                                <CalendarRange size={12} /> Tempo restante
                            </p>
                            <p className="text-sm font-semibold text-ink mt-1">{remaining.months}m {remaining.days}d</p>
                        </div>
                    </div>

                    <div className="mt-3 h-1.5 rounded-full bg-surface-soft overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-accent-yellow to-accent-pink-soft"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>

                    <p className="mt-3 text-[11px] text-ink-subtle">
                        {format(pdiStart, "MMM 'de' yyyy", { locale: ptBR })}
                        {' — '}
                        {format(pdiEnd, "MMM 'de' yyyy", { locale: ptBR })}
                    </p>
                </div>

                <div className="lg:sticky lg:top-24 rounded-2xl overflow-hidden border border-[#2A2A35] shadow-lg bg-[#181820]">
                    <div className="flex items-center gap-4 px-5 py-3.5 bg-[#121218] border-b border-[#2A2A35]">
                        <div className="flex gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-[#F09995]" />
                            <span className="w-3 h-3 rounded-full bg-[#FAC775]" />
                            <span className="w-3 h-3 rounded-full bg-[#97C459]" />
                        </div>
                        <span className="text-xs font-mono text-[#9A9AA5]">Developer.cs</span>
                    </div>

                    <div className="px-6 py-8 font-mono text-[15px] leading-loose text-[#D8D8E0]">
                        <p><span className="text-[#F7C6D9]">public class</span> <span className="text-[#F6D374]">Developer</span></p>
                        <p>{'{'}</p>
                        <p className="pl-4">
                            <span className="text-[#F7C6D9]">public string</span> Name <span className="text-[#7A7A85]">=&gt;</span>{' '}
                            <span className="text-[#A9D18E]">"{profile.name}"</span>;
                        </p>
                        <p className="pl-4">
                            <span className="text-[#F7C6D9]">public string</span> Role <span className="text-[#7A7A85]">=&gt;</span>{' '}
                            <span className="text-[#A9D18E]">"{profile.title}"</span>;
                        </p>
                        <p className="pl-4">
                            <span className="text-[#F7C6D9]">public string</span> Company <span className="text-[#7A7A85]">=&gt;</span>{' '}
                            <span className="text-[#A9D18E]">"{profile.company}"</span>;
                        </p>
                        <p className="pl-4 mt-2">
                            <span className="text-[#F7C6D9]">public string</span>[] Stack <span className="text-[#7A7A85]">=&gt;</span>{' '}
                            <span className="text-[#F7C6D9]">new</span>[]
                        </p>
                        <p className="pl-4">{'{'}</p>
                        {stack.map((tech) => (
                            <p key={tech} className="pl-8">
                                <span className="text-[#A9D18E]">"{tech}"</span>,
                            </p>
                        ))}
                        <p className="pl-4">{'};'}</p>
                        <p>{'}'}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
