import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from '../context/ThemeContext'
import { profileService } from '../services/profile'
import { AVATAR_URL } from '../libs/constants'

const links = [
    { to: '/', label: 'Sobre' },
    { to: '/metas', label: 'Metas' },
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/contribuicoes', label: 'Contribuições' },
    { to: '/soft-skills', label: 'Soft Skills' },
]

export function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const { data: profiles } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getAll(),
    })
    const profile = profiles?.[0]

    return (
        <nav className="sticky top-0 z-50 bg-surface border-b border-border">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={AVATAR_URL}
                        alt={profile?.name ?? 'Foto de perfil'}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-ink hidden sm:inline">
                        {profile ? `${profile.name} · PDI` : 'PDI'}
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    {links.map((link) => {
                        const isActive = location.pathname === link.to
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={
                                    isActive
                                        ? 'text-xs font-semibold text-ink-on-accent bg-accent-pink-soft rounded-full px-3 py-1'
                                        : 'text-sm text-ink-muted hover:text-ink transition-colors hidden md:inline'
                                }
                            >
                                {link.label}
                            </Link>
                        )
                    })}

                    <button
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-ink-muted hover:bg-surface-soft transition-colors"
                    >
                        {theme === 'dark' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}
