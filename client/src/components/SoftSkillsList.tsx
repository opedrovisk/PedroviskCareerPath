import { useEffect, useState } from 'react'
import { softSkillsService } from '../services/softSkills'
import type { SoftSkill } from '../types'

export function SoftSkillsList() {
    const [skills, setSkills] = useState<SoftSkill[]>([])

    useEffect(() => {
        softSkillsService.getAll().then(setSkills)
    }, [])

    return (
        <section className="max-w-3xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-[#2B2620] dark:text-[#F5F1E6] mb-4">🌱 Soft Skills</h2>
            <div className="space-y-3">
                {skills.map((skill) => (
                    <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-[#2B2620] dark:text-[#F5F1E6]">{skill.name}</span>
                            <span className="text-[#B0A98F] dark:text-[#9A9A9A]">{skill.level}/5</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-[#2A2519] rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-[#F6D374] to-[#F7C6D9] h-2 rounded-full"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}