import { useEffect, useState } from 'react'
import { roadmapService } from '../services/roadmap'
import type { RoadmapItem } from '../types'

const statusColors: Record<string, string> = {
    'concluído': 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
    'em andamento': 'bg-[#F6D374]/40 text-[#8A6D2E] dark:bg-[#F6D374]/15 dark:text-[#F6D374]',
    'planejado': 'bg-gray-100 text-gray-600 dark:bg-[#2A2A35] dark:text-[#C4C4C4]',
}

export function RoadmapList() {
    const [items, setItems] = useState<RoadmapItem[]>([])

    useEffect(() => {
        roadmapService.getAll().then(setItems)
    }, [])

    return (
        <section className="max-w-3xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mb-4">🚀 Roadmap Técnico</h2>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between bg-white dark:bg-[#1A1A22] rounded-lg border border-gray-200 dark:border-[#2A2A35] px-4 py-3"
                    >
                        <span className="font-medium text-[#2B2620] dark:text-[#F2F2F5]">{item.technology}</span>
                        <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[item.status] ?? 'bg-gray-100 text-gray-600 dark:bg-[#2A2A35] dark:text-[#C4C4C4]'
                                }`}
                        >
                            {item.status}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}