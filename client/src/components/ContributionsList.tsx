import { useEffect, useState } from 'react'
import { contributionsService } from '../services/contributions'
import type { Contribution } from '../types'

export function ContributionsList() {
    const [items, setItems] = useState<Contribution[]>([])

    useEffect(() => {
        contributionsService.getAll().then(setItems)
    }, [])

    return (
        <section className="max-w-3xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mb-4">💡 Contribuições</h2>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item.id} className="bg-white dark:bg-[#1A1A22] rounded-lg border border-gray-200 dark:border-[#2A2A35] px-4 py-3">
                        <p className="font-medium text-[#2B2620] dark:text-[#F2F2F5]">
                            {item.url ? (
                                <a href={item.url} target="_blank" rel="noreferrer" className="hover:underline text-[#E88FB0] dark:text-[#F2A9C4]">
                                    {item.title}
                                </a>
                            ) : (
                                item.title
                            )}
                        </p>
                        <p className="text-sm text-[#8F8878] dark:text-[#C4C4C4]">{item.description}</p>
                        <p className="text-xs text-[#B0A98F] dark:text-[#9A9A9A] mt-1">
                            {new Date(item.date).toLocaleDateString('pt-BR')}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    )
}