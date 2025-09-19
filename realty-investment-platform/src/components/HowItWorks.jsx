import React from 'react';
import { SearchIcon, HomeIcon, BarChartIcon, DollarSignIcon } from 'lucide-react';
export const HowItWorks = () => {
  const steps = [{
    icon: <SearchIcon size={32} className="text-blue-600" />,
    title: 'Browse Properties',
    description: 'Explore our curated selection of investment properties with detailed financial metrics and projections.'
  }, {
    icon: <BarChartIcon size={32} className="text-blue-600" />,
    title: 'Analyze Performance',
    description: 'Review historical performance data, projected returns, and comprehensive property reports.'
  }, { 
    icon: <HomeIcon size={32} className="text-blue-600" />,
    title: 'Invest Securely',
    description: 'Choose your investment amount and complete your transaction through our secure platform.'
  }, {
    icon: <DollarSignIcon size={32} className="text-blue-600" />,
    title: 'Earn Passive Income',
    description: 'Receive regular dividend payments and track your investment performance in real-time.'
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've simplified the real estate investment process so you can start
            building wealth in just a few steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full mb-6">
                {step.icon}
              </div>
              <div className="relative mb-8 w-full">
                {index < steps.length - 1 && <div className="hidden lg:block absolute top-[-30px] left-[60%] w-[80%] h-[2px] bg-blue-200"></div>}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                {index + 1}
              </div>
            </div>)}
        </div>
        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
            Get Started Today
          </button>
        </div>
      </div>
    </section>;
};