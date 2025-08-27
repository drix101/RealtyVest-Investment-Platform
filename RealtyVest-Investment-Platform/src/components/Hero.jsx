import React from 'react';
import { SearchIcon, MapPinIcon } from 'lucide-react';
export const Hero = () => {
  return <section className="relative bg-blue-800 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{
      backgroundImage: "url(/images/Realty-bg.png)"
    }}></div>
      <div className="container mx-auto px-4 py-16 md:py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Real Estate Investing Made Simple
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-blue-100">
            Access exclusive investment properties with returns that outperform
            the market. Start building your real estate portfolio today.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:gap-4">
              <div className="relative">
                <MapPinIcon size={20} className="absolute left-3 top-3 text-gray-400" />
                <input type="text" placeholder="City, neighborhood, or ZIP" className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select className="flex-1 px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white">
                  <option value="">Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                </select>
                <select className="flex-1 px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white">
                  <option value="">Price Range</option>
                  <option value="100k-250k">$100k - $250k</option>
                  <option value="250k-500k">$250k - $500k</option>
                  <option value="500k-1m">$500k - $1M</option>
                  <option value="1m+">$1M+</option>
                </select>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition w-full md:w-auto">
                <SearchIcon size={20} className="mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};