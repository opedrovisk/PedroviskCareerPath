import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ProfileHeader } from './components/ProfileHeader'
import { GoalsList } from './components/GoalsList'
import { RoadmapList } from './components/RoadmapList'
import { ContributionsList } from './components/ContributionsList'
import { SoftSkillsList } from './components/SoftSkillsList'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ProfileHeader />} />
          <Route path="/metas" element={<GoalsList />} />
          <Route path="/roadmap" element={<RoadmapList />} />
          <Route path="/contribuicoes" element={<ContributionsList />} />
          <Route path="/soft-skills" element={<SoftSkillsList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App