import React from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import InvestmentMetrics from './components/InvestmentMetrices'
import FeaturedProperties from './components/FeaturedProperties'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <InvestmentMetrics />
        <FeaturedProperties />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App;