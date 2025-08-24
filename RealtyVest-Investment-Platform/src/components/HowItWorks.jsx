import React from 'react'

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Browse Properties",
      description: "Explore our curated selection of investment properties with detailed financial metrics and projections.",
      stepNumber: 1
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Analyze Performance",
      description: "Review historical performance data, projected returns, and comprehensive property reports.",
      stepNumber: 2
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Invest Securely",
      description: "Choose your investment amount and complete your transaction through our secure platform.",
      stepNumber: 3
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Earn Passive Income",
      description: "Receive regular dividend payments and track your investment performance in real-time.",
      stepNumber: 4
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've simplified the real estate investment process so you can start building wealth in just a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Step Icon */}
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                {step.icon}
              </div>
              
              {/* Step Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              {/* Step Description */}
              <p className="text-gray-600 mb-6">
                {step.description}
              </p>
              
              {/* Step Number */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {step.stepNumber}
              </div>
            </div>
          ))}
        </div>

        {/* Connecting Lines (visible on larger screens) */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium transition duration-150 ease-in-out">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;