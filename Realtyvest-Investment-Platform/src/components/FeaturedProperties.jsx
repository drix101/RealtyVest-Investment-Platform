import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PropertyCard } from './PropertyCard';
export const FeaturedProperties = () => {
  const navigate = useNavigate();
  const properties = [{
    id: 1,
    image: '/images/apartment-1.png',
    title: 'Oakwood Residences',
    location: 'Austin, TX',
    price: '$250,000',
    roi: '8.2%',
    occupancy: '97%',
    investors: 42,
    isPopular: true
  }, {
    id: 2,
    image: '/images/apartment-2.png',
    title: 'Horizon Towers',
    location: 'Miami, FL',
    price: '$420,000',
    roi: '7.5%',
    occupancy: '95%',
    investors: 31
  }, {
    id: 3,
    image: '/images/apartment-3.png',
    title: 'Pine Valley Estate',
    location: 'Denver, CO',
    price: '$375,000',
    roi: '9.1%',
    occupancy: '98%',
    investors: 27
  }, {
    id: 4,
    image: '/images/apartment-4.png',
    title: 'Lakeside Apartments',
    location: 'Chicago, IL',
    price: '$310,000',
    roi: '8.7%',
    occupancy: '96%',
    investors: 38
  }, {
    id: 5,
    image: '/images/apartment-5.png',
    title: 'Sunset Plaza',
    location: 'Phoenix, AZ',
    price: '$290,000',
    roi: '8.3%',
    occupancy: '94%',
    investors: 23,
    isPopular: true
  }, {
    id: 6,
    image: '/images/apartment-6.png',
    title: 'Maple Grove Condos',
    location: 'Nashville, TN',
    price: '$340,000',
    roi: '7.8%',
    occupancy: '97%',
    investors: 19
  }];
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Investment Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of high-performing real estate
            investment opportunities with attractive returns.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => <PropertyCard key={index} {...property} />)}
        </div>
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium" onClick={() => navigate('/properties')}>
            View All Properties
          </button>
        </div>
      </div>
    </section>;
};