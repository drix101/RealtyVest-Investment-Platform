import React from 'react';
import { TrendingUpIcon, PieChartIcon, BarChart4Icon, DollarSignIcon } from 'lucide-react';
export const InvestmentMetrics = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Investment Performance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our real estate investments consistently outperform traditional
            investment options while providing stable cash flow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
              <TrendingUpIcon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">8.7%</h3>
            <p className="text-gray-600 text-sm">Average Annual Return</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{
              width: '87%'
            }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-full mb-4">
              <DollarSignIcon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">$32.4M</h3>
            <p className="text-gray-600 text-sm">
              Total Assets Under Management
            </p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{
              width: '92%'
            }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-center w-14 h-14 bg-purple-100 text-purple-600 rounded-full mb-4">
              <PieChartIcon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">96%</h3>
            <p className="text-gray-600 text-sm">Average Occupancy Rate</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{
              width: '96%'
            }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center justify-center w-14 h-14 bg-amber-100 text-amber-600 rounded-full mb-4">
              <BarChart4Icon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">3,200+</h3>
            <p className="text-gray-600 text-sm">Active Investors</p>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 rounded-full" style={{
              width: '82%'
            }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};