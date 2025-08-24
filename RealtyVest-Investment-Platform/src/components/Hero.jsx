import React, { useState } from 'react'

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', searchData)
  }

  return (
    <section className="relative text-white" style={{
      backgroundImage: "url('/images/Realty-bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Real Estate Investing Made Simple
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-blue-100">
            Access exclusive investment properties with attractive returns. Start building your real estate portfolio today.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter neighborhood or ZIP"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                  />
                </div>

                {/* Property Type Dropdown */}
                <select
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={searchData.propertyType}
                  onChange={(e) => setSearchData({...searchData, propertyType: e.target.value})}
                >
                  <option value="">Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="land">Land</option>
                </select>

                {/* Price Range Dropdown */}
                <select
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({...searchData, priceRange: e.target.value})}
                >
                  <option value="">Price Range</option>
                  <option value="0-100k">$0 - $100K</option>
                  <option value="100k-500k">$100K - $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m+">$1M+</option>
                </select>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-150 ease-in-out flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;