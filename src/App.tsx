import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AppPage from './pages/AppPage'
import SchoolProfilePage from './pages/SchoolProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import MyPostsPage from './pages/MyPostsPage'
import AppShell from './components/layout/AppShell'
import AdminClaimsPage from './pages/AdminClaimsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App shell — wraps all authenticated routes */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="/app/lounge" replace />} />
          <Route path="lounge"    element={<AppPage />} />
          <Route path="parents"   element={<AppPage />} />
          <Route path="claims"    element={<AppPage />} />
          <Route path="gratitude" element={<AppPage />} />
          <Route path="school/:id"      element={<SchoolProfilePage />} />
          <Route path="notifications"   element={<NotificationsPage />} />
          <Route path="my-posts"        element={<MyPostsPage />} />
          <Route path="admin"           element={<AdminClaimsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
