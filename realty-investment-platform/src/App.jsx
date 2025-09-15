import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import './App.css'

// Lazy load heavy pages
const AuthPage = React.lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })))
const PropertiesPage = React.lazy(() => import('./pages/PropertiesPage').then(module => ({ default: module.PropertiesPage })))
const PropertyDetailPage = React.lazy(() => import('./pages/PropertyDetailPage').then(module => ({ default: module.PropertyDetailPage })))
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorksPage').then(module => ({ default: module.HowItWorksPage })))
const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage').then(module => ({ default: module.AboutUsPage })))
const ResourcesPage = React.lazy(() => import('./pages/ResourcesPage').then(module => ({ default: module.ResourcesPage })))
const AuthCallback = React.lazy(() => import('./pages/AuthCallback').then(module => ({ default: module.AuthCallback })))
const IdentityVerificationPage = React.lazy(() => import('./pages/IdentityVerificationPage').then(module => ({ default: module.IdentityVerificationPage })))

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/verify-identity" element={<IdentityVerificationPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App