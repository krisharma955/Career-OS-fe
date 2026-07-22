import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import StudentOnboarding from './pages/StudentOnboarding.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import CompanyDashboard from './pages/CompanyDashboard.jsx'
import CompanyOnboarding from './pages/CompanyOnboarding.jsx'

// Guard: redirect to login if no token
function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken')
  return token ? children : <Navigate to="/login" replace />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Student onboarding — shown only on first signup */}
        <Route path="/onboarding/student" element={
          <PrivateRoute><StudentOnboarding /></PrivateRoute>
        } />

        {/* Company onboarding — shown only on first signup */}
        <Route path="/onboarding/company" element={
          <PrivateRoute><CompanyOnboarding /></PrivateRoute>
        } />

        {/* Student dashboard */}
        <Route path="/dashboard/student" element={
          <PrivateRoute><StudentDashboard /></PrivateRoute>
        } />

        {/* Company dashboard */}
        <Route path="/dashboard/company" element={
          <PrivateRoute><CompanyDashboard /></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
