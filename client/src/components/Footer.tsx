import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FiMail, FiGlobe } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6'
import { profileService } from '../services/profile'

const TWITTER_URL = 'https://x.com/opedrovisk'
const INSTAGRAM_URL = 'https://instagram.com/opedrovisk'
const EMAIL = 'pedrovisk@example.com'
const WEBSITE_URL = 'https://github.com/opedrovisk'

const ICON_CLASS =
    'text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors'

export function Footer() {
    const { data: profiles } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getAll(),
    })
    const profile = profiles?.[0] ?? null

    return (
        <footer className="bg-[#FFFDF8] dark:bg-[#121218] border-t border-[#F0EAD8] dark:border-[#2A2A35]">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A] text-center sm:text-left">
                    {profile?.name ?? 'Pedro Visk'} · Plano de Desenvolvimento Individual · {new Date().getFullYear()}
                    {profile && (
                        <>
                            {' · Atualizado em '}
                            {format(new Date(profile.lastUpdate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </>
                    )}
                </p>

                {profile && (
                    <div className="flex items-center gap-4">
                        <a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" className={ICON_CLASS}>
                            <FaGithub size={18} />
                        </a>
                        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={ICON_CLASS}>
                            <FaLinkedin size={18} />
                        </a>
                        <a href={TWITTER_URL} target="_blank" rel="noreferrer" aria-label="X (Twitter)" className={ICON_CLASS}>
                            <FaXTwitter size={17} />
                        </a>
                        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className={ICON_CLASS}>
                            <FaInstagram size={18} />
                        </a>
                        <a href={`mailto:${EMAIL}`} aria-label="E-mail" className={ICON_CLASS}>
                            <FiMail size={18} />
                        </a>
                        <a href={WEBSITE_URL} target="_blank" rel="noreferrer" aria-label="Site pessoal" className={ICON_CLASS}>
                            <FiGlobe size={18} />
                        </a>
                    </div>
                )}
            </div>
        </footer>
    )
}