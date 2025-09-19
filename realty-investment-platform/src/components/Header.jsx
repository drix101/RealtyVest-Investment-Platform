import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X as CloseIcon, User2Icon } from 'lucide-react';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = path => {
    return location.pathname === path ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-700 font-medium';
  };
  return <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/"> 
            <h1 className="text-2xl font-bold text-blue-700">RealtyVest</h1>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/properties" className={isActive('/properties')}>
            Properties
          </Link>
          <Link to="/how-it-works" className={isActive('/how-it-works')}>
            How It Works
          </Link>
          <Link to="/resources" className={isActive('/resources')}>
            Resources
          </Link>
          <Link to="/about" className={isActive('/about')}>
            About Us
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth" className="px-4 py-2 text-blue-700 font-medium hover:text-blue-800">
            Login
          </Link>
          <Link to="/auth?signup=true" className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition flex items-center">
            <User2Icon size={18} className="mr-2" />
            Sign Up
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white border-t py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/properties" className="text-gray-700 hover:text-blue-700 font-medium py-3 px-2 rounded-md hover:bg-blue-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
              Properties
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-blue-700 font-medium py-3 px-2 rounded-md hover:bg-blue-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-700 font-medium py-3 px-2 rounded-md hover:bg-blue-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
              Resources
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 font-medium py-3 px-2 rounded-md hover:bg-blue-50 flex items-center" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t">
              <Link to="/auth" className="px-4 py-3 text-blue-700 font-medium hover:text-blue-800 text-center rounded-md hover:bg-blue-50" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/auth?signup=true" className="px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                <User2Icon size={18} className="mr-2" />
                Sign Up
              </Link>
            </div>
          </nav>
        </div>}
    </header>;
};