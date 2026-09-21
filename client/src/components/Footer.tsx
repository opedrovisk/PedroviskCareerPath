import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FiMail, FiGlobe } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6'
import { profileService } from '../services/profile'

const ICON_CLASS =
    'text-[#8F8878] dark:text-[#9A9A9A] hover:text-[#2B2620] dark:hover:text-[#F2F2F5] transition-colors'

export function Footer() {
    const { data: profiles } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getAll(),
    })
    const profile = profiles?.[0] ?? null

    const links = profile
        ? [
              { label: 'GitHub', href: profile.githubUrl, icon: <FaGithub size={18} /> },
              { label: 'LinkedIn', href: profile.linkedinUrl, icon: <FaLinkedin size={18} /> },
              { label: 'X (Twitter)', href: profile.twitterUrl, icon: <FaXTwitter size={17} /> },
              { label: 'Instagram', href: profile.instagramUrl, icon: <FaInstagram size={18} /> },
              { label: 'E-mail', href: profile.email ? `mailto:${profile.email}` : undefined, icon: <FiMail size={18} /> },
              { label: 'Site pessoal', href: profile.websiteUrl, icon: <FiGlobe size={18} /> },
          ].filter((link) => link.href)
        : []

    return (
        <footer className="bg-[#FFFDF8] dark:bg-[#121218] border-t border-[#F0EAD8] dark:border-[#2A2A35]">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-[#8F8878] dark:text-[#9A9A9A] text-center sm:text-left">
                    {profile?.name ?? 'Pedro Marcondes'} · Plano de Desenvolvimento Individual · {new Date().getFullYear()}
                    {profile && (
                        <>
                            {' · Atualizado em '}
                            {format(new Date(profile.lastUpdate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </>
                    )}
                </p>

                <div className="flex items-center gap-4">
                    {links.map((link) => {
                        const external = !link.href!.startsWith('mailto:')
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                aria-label={link.label}
                                className={ICON_CLASS}
                                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                            >
                                {link.icon}
                            </a>
                        )
                    })}
                </div>
            </div>
        </footer>
    )
}
