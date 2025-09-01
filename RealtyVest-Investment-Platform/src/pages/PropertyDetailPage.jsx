import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  BedIcon, 
  BathIcon, 
  SquareIcon, 
  UsersIcon, 
  TrendingUpIcon, 
  BarChart3Icon,
  CalendarIcon,
  DollarSignIcon, 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  CameraIcon,
  HomeIcon,
  BuildingIcon,
  WarehouseIcon,
  TreeIcon
} from 'lucide-react';
import { useVerificationStore } from '../store/useVerificationStore';
import { usePropertyStore } from '../store/usePropertyStore';

export const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { canInvest } = useVerificationStore();
  const { getProperty, addInvestment, getInvestmentSummary } = usePropertyStore();

  // Get property data from store
  const property = getProperty(propertyId);

  // If property not found, show error or redirect
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const imageCategories = [
    { id: 'interior', label: 'Interior', images: property.images.interior },
    { id: 'exterior', label: 'Exterior', images: property.images.exterior },
    { id: 'amenities', label: 'Amenities', images: property.images.amenities }
  ];

  const getPropertyTypeIcon = () => {
    switch (property.type) {
      case 'residential':
        return <HomeIcon className="h-5 w-5" />;
      case 'commercial':
        return <BuildingIcon className="h-5 w-5" />;
      case 'industrial':
        return <WarehouseIcon className="h-5 w-5" />;
      case 'land':
        return <TreeIcon className="h-5 w-5" />;
      default:
        return <HomeIcon className="h-5 w-5" />;
    }
  };

  const handleInvestment = () => {
    if (!canInvest()) {
      navigate('/verification');
      return;
    }
    setShowInvestmentModal(true);
  };

  const handleInvestSubmit = (e) => {
    e.preventDefault();
    
    // Add investment to store
    addInvestment(property.id, {
      amount: parseFloat(investmentAmount),
      shares: Math.floor(investmentAmount / (property.price / property.investmentTerms.availableShares))
    });
    
    // Show success message and close modal
    setShowInvestmentModal(false);
    setInvestmentAmount('');
    alert('Investment submitted successfully!');
  };

  const availableShares = property.investmentTerms.availableShares - property.investmentTerms.soldShares;
  const sharePrice = property.price / property.investmentTerms.availableShares;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/properties')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Properties
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <HeartIcon className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative">
                <img
                  src={imageCategories[0].images[selectedImage]}
                  alt={property.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium">
                    {getPropertyTypeIcon()}
                    <span className="ml-2 capitalize">{property.type}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {property.roi}% ROI
                  </div>
                </div>
              </div>
              
              {/* Image Thumbnails */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {imageCategories[0].images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Info Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b">
                <nav className="flex">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'photos', label: 'Photos' },
                    { id: 'financials', label: 'Financials' },
                    { id: 'neighborhood', label: 'Neighborhood' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h2>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        <span>{property.location}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <BedIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">{property.features.bedrooms}</div>
                        <div className="text-sm text-gray-600">Bedrooms</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <BathIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">{property.features.bathrooms}</div>
                        <div className="text-sm text-gray-600">Bathrooms</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <SquareIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">{property.features.squareFeet.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Sq Ft</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <CalendarIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">{property.features.yearBuilt}</div>
                        <div className="text-sm text-gray-600">Year Built</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'photos' && (
                  <div className="space-y-6">
                    {imageCategories.map((category) => (
                      <div key={category.id}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.label} Photos</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {category.images.map((image, index) => (
                            <div key={index} className="aspect-square rounded-lg overflow-hidden">
                              <img
                                src={image}
                                alt={`${category.label} ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'financials' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Income & Expenses</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Monthly Rent</span>
                            <span className="font-semibold">${property.financials.monthlyRent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Income</span>
                            <span className="font-semibold">${property.financials.annualIncome.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Expenses</span>
                            <span className="font-semibold">${property.financials.expenses.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-900 font-semibold">Net Income</span>
                            <span className="text-green-600 font-bold">${property.financials.netIncome.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Metrics</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cap Rate</span>
                            <span className="font-semibold">{property.financials.capRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cash-on-Cash Return</span>
                            <span className="font-semibold">{property.financials.cashOnCash}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Occupancy Rate</span>
                            <span className="font-semibold">{property.occupancy}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Terms</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Min Investment</div>
                          <div className="font-semibold">${property.investmentTerms.minInvestment.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Max Investment</div>
                          <div className="font-semibold">${property.investmentTerms.maxInvestment.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Available Shares</div>
                          <div className="font-semibold">{availableShares}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Share Price</div>
                          <div className="font-semibold">${sharePrice.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'neighborhood' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{property.neighborhood.walkScore}</div>
                        <div className="text-sm text-gray-600">Walk Score</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{property.neighborhood.transitScore}</div>
                        <div className="text-sm text-gray-600">Transit Score</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{property.neighborhood.bikeScore}</div>
                        <div className="text-sm text-gray-600">Bike Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Nearby Amenities</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Schools</span>
                            <span className="font-semibold">{property.neighborhood.nearbySchools}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Restaurants</span>
                            <span className="font-semibold">{property.neighborhood.nearbyRestaurants}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Safety</h4>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">Low Crime Rate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Investment Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Price</span>
                    <span className="text-xl font-bold">${property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ROI</span>
                    <span className="text-green-600 font-semibold">{property.roi}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Occupancy</span>
                    <span className="font-semibold">{property.occupancy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Investors</span>
                    <span className="font-semibold">{property.investors}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Investment Progress</h4>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Shares Sold</span>
                      <span>{property.investmentTerms.soldShares}/{property.investmentTerms.availableShares}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(property.investmentTerms.soldShares / property.investmentTerms.availableShares) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {availableShares} shares remaining at ${sharePrice.toLocaleString()} each
                  </p>
                </div>

                <button
                  onClick={handleInvestment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Invest Now
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-semibold">${property.financials.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cap Rate</span>
                    <span className="font-semibold">{property.financials.capRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-semibold">{property.features.yearBuilt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-semibold capitalize">{property.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Invest in {property.title}</h3>
            
            <form onSubmit={handleInvestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <DollarSignIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={property.investmentTerms.minInvestment}
                    max={property.investmentTerms.maxInvestment}
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Min: ${property.investmentTerms.minInvestment.toLocaleString()} | 
                  Max: ${property.investmentTerms.maxInvestment.toLocaleString()}
                </p>
              </div>

              {investmentAmount && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Investment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Shares to Purchase</span>
                      <span>{Math.floor(investmentAmount / sharePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Annual Return</span>
                      <span>${(investmentAmount * (property.roi / 100)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Income</span>
                      <span>${((investmentAmount * (property.roi / 100)) / 12).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowInvestmentModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Confirm Investment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
