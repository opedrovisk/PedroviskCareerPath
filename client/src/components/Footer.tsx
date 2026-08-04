import { useEffect, useState } from 'react'
import { profileService } from '../services/profile'
import type { Profile } from '../types'

const TWITTER_URL = 'https://x.com/opedrovisk'
const INSTAGRAM_URL = 'https://instagram.com/opedrovisk_'
const EMAIL = 'pedro.hmj.rocha77@gmail.com'
const WEBSITE_URL = 'https://github.com/opedrovisk'

export function Footer() {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        profileService.getAll().then((data) => setProfile(data[0] ?? null))
    }, [])

    return (
        <footer className="border-t border-[#F0EAD8] dark:border-[#2A2A35] mt-16">
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A] text-center sm:text-left">
                    {profile?.name ?? 'Pedrovisk'} · Plano de Desenvolvimento Individual · {new Date().getFullYear()}
                    {profile && (
                        <>
                            {' · Atualizado em '}
                            {new Date(profile.lastUpdate).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </>
                    )}
                </p>

                {profile && (
                    <div className="flex items-center gap-4">
                        <a
                            href={profile.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.94c.57.1.78-.25.78-.55v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                            </svg>
                        </a>
                        <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                            </svg>
                        </a>
                        <a
                            href={TWITTER_URL}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="X (Twitter)"
                            className="text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.9 2H22l-7.6 8.68L23.3 22h-6.98l-5.47-7.15L4.6 22H1.48l8.13-9.29L.9 2h7.15l4.94 6.53L18.9 2zm-1.22 18.17h1.93L6.4 3.72H4.32l13.36 16.45z" />
                            </svg>
                        </a>
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.35 1.26.4 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.35-2.43.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.35-1.26-.4-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.97.4-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.35 2.43-.4C9.29 1.34 9.67 1.33 12 1.33V2.2zm0 1.98c-3.15 0-3.5.01-4.74.07-.96.04-1.48.2-1.82.34-.46.18-.79.39-1.13.73-.34.34-.55.67-.73 1.13-.14.34-.3.86-.34 1.82-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.82.18.46.39.79.73 1.13.34.34.67.55 1.13.73.34.14.86.3 1.82.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.82-.34.46-.18.79-.39 1.13-.73.34-.34.55-.67.73-1.13.14-.34.3-.86.34-1.82.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.82a3 3 0 0 0-.73-1.13 3 3 0 0 0-1.13-.73c-.34-.14-.86-.3-1.82-.34-1.24-.06-1.59-.07-4.74-.07zm0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9zm0 7.34a2.9 2.9 0 1 0 0-5.78 2.9 2.9 0 0 0 0 5.78zm5.66-7.52a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0z" />
                            </svg>
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            aria-label="E-mail"
                            className="text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m3 6 9 6 9-6" />
                            </svg>
                        </a>
                        <a
                            href={WEBSITE_URL}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Site pessoal"
                            className="text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9s1.2-6.4 3.6-9z" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </footer>
    )
}