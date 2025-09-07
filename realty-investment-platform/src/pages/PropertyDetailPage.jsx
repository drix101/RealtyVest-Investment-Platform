import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPinIcon, BarChart3Icon, TrendingUpIcon, UsersIcon, BedIcon, BathIcon, SquareIcon, CalendarIcon, CheckIcon } from 'lucide-react';
import RealEstateApiService from '../services/realEstateApi';

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  
  // Mock additional images for the gallery
  const additionalImages = [
    { id: 1, src: '/images/apartment-1.png', alt: 'Living Room' },
    { id: 2, src: '/images/apartment-2.png', alt: 'Kitchen' },
    { id: 3, src: '/images/apartment-3.png', alt: 'Bedroom' },
    { id: 4, src: '/images/apartment-4.png', alt: 'Bathroom' },
    { id: 5, src: '/images/apartment-5.png', alt: 'Exterior' },
  ];

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const realEstateApi = new RealEstateApiService();
        const properties = realEstateApi.getMockProperties();
        const foundProperty = properties.find(p => p.id === parseInt(id));
        
        if (!foundProperty) {
          throw new Error('Property not found');
        }
        
        setProperty(foundProperty);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPropertyDetails();
  }, [id]);

  const handleInvestmentChange = (e) => {
    setInvestmentAmount(e.target.value);
  };

  const handleInvestmentSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to a payment processor
    alert(`Investment of $${investmentAmount} submitted for ${property.title}. In a real app, this would connect to a payment processor.`);
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
        <Link to="/properties" className="text-blue-600 hover:underline mt-2 inline-block">
          Return to properties
        </Link>
      </div>
    </div>
  );

  if (!property) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to="/properties" className="text-gray-500 hover:text-blue-600">Properties</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-blue-600">{property.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Images and Details */}
        <div className="lg:col-span-2">
          {/* Main Image Gallery */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="relative h-96">
              <img 
                src={activeImage === 0 ? property.image : additionalImages[activeImage-1].src} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              {property.isPopular && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button 
                  onClick={() => setActiveImage(0)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === 0 ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img src={property.image} alt="Main" className="w-full h-full object-cover" />
                </button>
                {additionalImages.map((img, index) => (
                  <button 
                    key={img.id}
                    onClick={() => setActiveImage(index+1)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${activeImage === index+1 ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPinIcon size={18} className="mr-1 flex-shrink-0" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-lg font-bold">
                  {property.price}
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <BedIcon size={18} className="mr-1" />
                    <span>Bedrooms</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <BathIcon size={18} className="mr-1" />
                    <span>Bathrooms</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <SquareIcon size={18} className="mr-1" />
                    <span>Square Feet</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.squareFeet.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-gray-500 mb-1">
                    <CalendarIcon size={18} className="mr-1" />
                    <span>Year Built</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.yearBuilt || 'N/A'}</span>
                </div>
              </div>

              {/* Investment Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <TrendingUpIcon size={18} className="mr-1" />
                    <span>ROI</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.roi}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <BarChart3Icon size={18} className="mr-1" />
                    <span>Occupancy</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.occupancy}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <UsersIcon size={18} className="mr-1" />
                    <span>Investors</span>
                  </div>
                  <span className="font-bold text-blue-700">{property.investors}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckIcon size={16} className="text-green-500 mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Investment Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Invest in this Property</h2>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Minimum Investment</span>
                  <span>$5,000</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Expected Annual Return</span>
                  <span className="font-medium text-green-600">{property.roi}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Property Type</span>
                  <span className="capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Current Investors</span>
                  <span>{property.investors}</span>
                </div>
              </div>
              
              <form onSubmit={handleInvestmentSubmit}>
                <div className="mb-4">
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Amount ($)
                  </label>
                  <input
                    type="number"
                    id="investmentAmount"
                    min="5000"
                    step="1000"
                    value={investmentAmount}
                    onChange={handleInvestmentChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount (min $5,000)"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Investment Summary</h3>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Your Investment</span>
                      <span>${investmentAmount ? parseInt(investmentAmount).toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Expected Annual Return</span>
                      <span>${investmentAmount ? (parseInt(investmentAmount) * parseFloat(property.roi) / 100).toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-blue-700 mt-2 pt-2 border-t border-blue-100">
                      <span>Estimated Monthly Income</span>
                      <span>${investmentAmount ? Math.round(parseInt(investmentAmount) * parseFloat(property.roi) / 100 / 12).toLocaleString() : '0'}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!investmentAmount || parseInt(investmentAmount) < 5000}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition font-medium"
                >
                  Invest Now
                </button>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  By investing, you agree to our Terms of Service and Privacy Policy.
                  All investments involve risk and may lose value.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;