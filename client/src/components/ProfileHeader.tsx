import { useEffect, useState } from 'react'
import { profileService } from '../services/profile'
import type { Profile } from '../types'

// TODO: stack e datas do PDI ainda são fixas — plugar no backend depois
// (adicionar TechStack, PdiStartDate, PdiEndDate ao model Profile)
const STACK = ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'React', 'Azure']
const PDI_START = new Date('2026-02-01')
const PDI_END = new Date('2026-12-01')

function monthsBetween(a: Date, b: Date) {
    const totalDays = Math.max(0, Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)))
    const months = Math.floor(totalDays / 30)
    const days = totalDays % 30
    return { months, days }
}

export function ProfileHeader() {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        profileService.getAll().then((data) => setProfile(data[0] ?? null))
    }, [])

    if (!profile) return null

    const initials = profile.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')

    const now = new Date()
    const elapsed = monthsBetween(PDI_START, now)
    const remaining = monthsBetween(now, PDI_END)
    const progressPct = Math.min(
        100,
        Math.max(0, ((now.getTime() - PDI_START.getTime()) / (PDI_END.getTime() - PDI_START.getTime())) * 100)
    )

    return (
        <header className="relative overflow-hidden">
            {/* Fundo: usa o wallpaper global do body (index.css), sem camada própria */}

            <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 items-start">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F6D374] to-[#F7C6D9] flex items-center justify-center text-[#2B2620] text-sm font-semibold">
                            {initials}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#2B2620] dark:text-[#F2F2F5]">{profile.name}</p>
                            <p className="text-xs text-[#8F8878] dark:text-[#C4C4C4]">{profile.title}</p>
                        </div>
                        <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F6D374]/30 dark:bg-[#F6D374]/10 text-[#8A6D2E] dark:text-[#F6D374]">
                            Em andamento
                        </span>
                    </div>

                    <span className="inline-block text-xs font-semibold tracking-wide text-[#8A6D2E] dark:text-[#F6D374] bg-[#F6D374]/50 dark:bg-[#F6D374]/10 rounded-full px-3 py-1 mb-6">
                        ✦ Plano de Desenvolvimento Individual
                    </span>

                    <h1 className="text-5xl font-bold text-[#2B2620] dark:text-[#F2F2F5] tracking-tight leading-tight">
                        Olá, eu sou <span className="text-[#E88FB0] dark:text-[#F2A9C4]">{profile.name}</span>
                    </h1>

                    <p className="mt-4 text-xl text-[#2B2620] dark:text-[#F2F2F5] font-medium">{profile.title}</p>
                    <p className="text-[#8F8878] dark:text-[#C4C4C4]">{profile.subtitle}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {STACK.map((tech, i) => (
                            <span
                                key={tech}
                                className={`text-xs font-medium text-[#2B2620] dark:text-[#F2F2F5] border rounded-full px-3 py-1 ${i % 2 === 0
                                    ? 'bg-[#F6D374]/30 dark:bg-[#F6D374]/10 border-[#F0DFA0] dark:border-[#F6D374]/20'
                                    : 'bg-[#F7C6D9]/30 dark:bg-[#F7C6D9]/10 border-[#F3D2E1] dark:border-[#F7C6D9]/20'
                                    }`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <p className="mt-6 text-[#5A5548] dark:text-[#B8B8C2] max-w-xl">{profile.bio}</p>

                    <div className="mt-8 flex gap-3">
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2B2620] dark:bg-[#F2F2F5] text-white dark:text-[#121218] text-sm font-semibold shadow-sm hover:bg-[#443E33] dark:hover:bg-[#E5E0D0] transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-[#1E1E27] border border-[#F0DFA0] dark:border-[#2A2A35] text-[#2B2620] dark:text-[#F2F2F5] text-sm font-semibold hover:border-[#E88FB0] hover:text-[#E88FB0] transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>

                    <div className="mt-12 rounded-2xl border border-gray-200 dark:border-[#2A2A35] bg-white/60 dark:bg-[#1A1A22]/60 backdrop-blur-sm divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-[#2A2A35] grid sm:grid-cols-4">
                        <div className="px-5 py-4">
                            <p className="text-[10px] font-semibold tracking-wide text-[#B0A98F] dark:text-[#9A9A9A] uppercase">Empresa</p>
                            <p className="text-sm font-semibold text-[#2B2620] dark:text-[#F2F2F5] mt-1">{profile.company}</p>
                        </div>
                        <div className="px-5 py-4">
                            <p className="text-[10px] font-semibold tracking-wide text-[#B0A98F] dark:text-[#9A9A9A] uppercase">Área</p>
                            <p className="text-sm font-semibold text-[#2B2620] dark:text-[#F2F2F5] mt-1">{profile.area}</p>
                        </div>
                        <div className="px-5 py-4">
                            <p className="text-[10px] font-semibold tracking-wide text-[#B0A98F] dark:text-[#9A9A9A] uppercase">Tempo decorrido</p>
                            <p className="text-sm font-semibold text-[#2B2620] dark:text-[#F2F2F5] mt-1">{elapsed.months}m {elapsed.days}d</p>
                        </div>
                        <div className="px-5 py-4">
                            <p className="text-[10px] font-semibold tracking-wide text-[#B0A98F] dark:text-[#9A9A9A] uppercase">Tempo restante</p>
                            <p className="text-sm font-semibold text-[#2B2620] dark:text-[#F2F2F5] mt-1">{remaining.months}m {remaining.days}d</p>
                        </div>
                    </div>

                    <div className="mt-3 h-1.5 rounded-full bg-[#F5F2E8] dark:bg-[#2A2A35] overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#F6D374] to-[#F7C6D9]"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>

                    <p className="mt-3 text-[11px] text-[#B0A98F] dark:text-[#9A9A9A]">
                        {PDI_START.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                        {' — '}
                        {PDI_END.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                        {' · Última atualização: '}
                        {new Date(profile.lastUpdate).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
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
                        {STACK.map((tech) => (
                            <p key={tech} className="pl-8">
                                <span className="text-[#A9D18E]">"{tech}"</span>,
                            </p>
                        ))}
                        <p className="pl-4">{'};'}</p>
                        <p className="pl-4 mt-2">
                            <span className="text-[#F7C6D9]">public bool</span> AlwaysLearning <span className="text-[#7A7A85]">=&gt;</span>{' '}
                            <span className="text-[#F0A868]">true</span>;
                        </p>
                        <p>{'}'}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}