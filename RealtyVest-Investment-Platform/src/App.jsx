import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { PropertiesPage } from './pages/PropertiesPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { AboutUsPage } from './pages/AboutUsPage'
import { AuthPage } from './pages/AuthPage'


export function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Optionally, redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/Home" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;