import React from 'react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">RealtyVest</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#properties" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Properties
            </a>
            <a href="#how-it-works" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              How It Works
            </a>
            <a href="#resources" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Resources
            </a>
            <a href="#about-us" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              About Us
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
              Login
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;