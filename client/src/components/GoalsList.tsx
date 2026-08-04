import { useEffect, useState } from 'react'
import { goalsService } from '../services/goals'
import type { Goal } from '../types'

export function GoalsList() {
    const [goals, setGoals] = useState<Goal[]>([])

    useEffect(() => {
        goalsService.getAll().then(setGoals)
    }, [])

    return (
        <section className="max-w-3xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-[#2B2620] dark:text-[#F2F2F5] mb-4">🎯 Metas</h2>
            <ul className="space-y-2">
                {goals.map((goal) => (
                    <li
                        key={goal.id}
                        className="flex items-center gap-3 bg-white dark:bg-[#1A1A22] rounded-lg border border-gray-200 dark:border-[#2A2A35] px-4 py-3"
                    >
                        <span className={goal.isCompleted ? 'text-green-500' : 'text-gray-300 dark:text-[#34343F]'}>
                            {goal.isCompleted ? '✅' : '⬜'}
                        </span>
                        <div>
                            <p className="font-medium text-[#2B2620] dark:text-[#F2F2F5]">{goal.title}</p>
                            <p className="text-sm text-[#8F8878] dark:text-[#C4C4C4]">{goal.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}