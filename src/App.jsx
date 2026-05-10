import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import QuestionnairePage from './pages/QuestionnairePage'
import RatingPage from './pages/RatingPage'
import ResultsPage from './pages/ResultsPage'
import ExpertsPage from './pages/ExpertsPage'
import RoadmapPage from './pages/RoadmapPage'
import ReportsPage from './pages/ReportsPage'
import Navbar from './components/Navbar'

function Layout() {
  const location = useLocation()
  const hideNav = location.pathname === '/'

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/"              element={<LoginPage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/results"       element={<ResultsPage />} />
        <Route path="*"              element={<Navigate to="/" />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/experts" element={<ExpertsPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
