import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4 md:mb-6">
              RealtyVest
            </h3>
            <p className="text-gray-400 mb-6">
              The smarter way to invest in real estate. Start building your
              portfolio with high-yield properties.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition p-2" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition p-2" aria-label="Twitter">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition p-2" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition p-2" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition block py-1">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-white transition block py-1">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition block py-1">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition block py-1">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition block py-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 md:mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition block py-1">
                  Investment Guide
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition block py-1">
                  Market Reports
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition block py-1">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition block py-1">
                  Investor Education
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition block py-1">
                  Calculator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 md:mb-6">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon size={18} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Investment Ave, Suite 400
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon size={18} className="mr-3 text-blue-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <MailIcon size={18} className="mr-3 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@realtyvest.com" className="text-gray-400 hover:text-white">
                  info@realtyvest.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 md:mt-12 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0 text-center md:text-left">
            © 2023 RealtyVest. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};