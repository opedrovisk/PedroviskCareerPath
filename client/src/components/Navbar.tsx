import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

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

    return (
        <nav className="sticky top-0 z-50 bg-[#FFFDF8] dark:bg-[#121218] border-b border-[#F0EAD8] dark:border-[#2A2A35]">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F6D374] to-[#F7C6D9] flex items-center justify-center text-[#2B2620] text-xs font-bold">
                        PV
                    </span>
                    <span className="text-sm font-semibold text-[#2B2620] dark:text-[#F2F2F5] hidden sm:inline">
                        Pedrovisk - Plano de carreira
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
                                        ? 'text-xs font-semibold text-[#2B2620] bg-[#F7C6D9] rounded-full px-3 py-1'
                                        : 'text-sm text-[#8F8878] dark:text-[#C4C4C4] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors hidden md:inline'
                                }
                            >
                                {link.label}
                            </Link>
                        )
                    })}

                    <button
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#8F8878] dark:text-[#F6D374] hover:bg-[#F5F2E8] dark:hover:bg-[#2A2A35] transition-colors"
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