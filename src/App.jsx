import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import LoginPage from './pages/LoginPage'
import QuestionnairePage from './pages/QuestionnairePage'
import RatingPage from './pages/RatingPage'
import ResultsPage from './pages/ResultsPage'
import ExpertsPage from './pages/ExpertsPage'
import RoadmapPage from './pages/RoadmapPage'
import ReportsPage from './pages/ReportsPage'
import CompanyProfilePage from './pages/CompanyProfilePage'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { RoleProvider } from './contexts/RoleContext'

function Layout() {
  const location = useLocation()
  const hideNav = location.pathname === '/'

  return (
    <>
      {!hideNav && <Navbar />}
      <Box sx={{ display: 'flex', minHeight: hideNav ? '100vh' : 'calc(100vh - 64px)' }}>
        {!hideNav && <Sidebar />}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/"              element={<LoginPage />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
            <Route path="/results"       element={<ResultsPage />} />
            <Route path="/rating"        element={<RatingPage />} />
            <Route path="/experts"       element={<ExpertsPage />} />
            <Route path="/roadmap"       element={<RoadmapPage />} />
            <Route path="/reports"       element={<ReportsPage />} />
            <Route path="/company-profile" element={<CompanyProfilePage />} />
            <Route path="*"              element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <Layout />
      </RoleProvider>
    </BrowserRouter>
  )
}
