import React from 'react'

const InvestmentMetrics = () => {
  const metrics = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      value: "8.7%",
      label: "Average Annual Return",
      color: "blue",
      progress: 87
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      value: "$32.4M",
      label: "Total Assets Under Management",
      color: "green",
      progress: 75
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      value: "98%",
      label: "Average Occupancy Rate",
      color: "purple",
      progress: 98
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      value: "3,200+",
      label: "Investors",
      color: "orange",
      progress: 80
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "text-blue-600",
      green: "text-green-600", 
      purple: "text-purple-600",
      orange: "text-orange-600"
    }
    return colorMap[color] || "text-blue-600"
  }

  const getProgressColor = (color) => {
    const colorMap = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      purple: "bg-purple-600", 
      orange: "bg-orange-600"
    }
    return colorMap[color] || "bg-blue-600"
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Performance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our real estate investments consistently outperform traditional benchmark options while providing HIGH cash flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`${getColorClasses(metric.color)} mb-4`}>
                {metric.icon}
              </div>
              
              <div className={`${getColorClasses(metric.color)} text-4xl font-bold mb-2`}>
                {metric.value}
              </div>
              
              <div className="text-gray-600 text-sm mb-6">
                {metric.label}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${getProgressColor(metric.color)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${metric.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InvestmentMetrics;