import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  BarChart3Icon, 
  TrendingUpIcon, 
  UsersIcon, 
  BedIcon, 
  BathIcon, 
  SquareIcon, 
  CalendarIcon, 
  CheckIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  DollarSignIcon,
  PieChartIcon,
  BuildingIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        
        // Load data from our JSON file
        const response = await fetch('/Data/data.json');
        const data = await response.json();
        const foundProperty = data.properties.find(p => p.id === parseInt(id));
        
        if (!foundProperty) {
          throw new Error('Property not found');
        }
        
        setProperty(foundProperty);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property:', err);
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
    if (investmentAmount && parseInt(investmentAmount) >= property.investmentDetails.minimumInvestment) {
      // Handle investment submission
      console.log('Investment submitted:', investmentAmount);
      alert(`Investment of $${parseInt(investmentAmount).toLocaleString()} submitted successfully!`);
    }
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const calculateMonthlyReturn = () => {
    if (!investmentAmount || !property) return 0;
    return Math.round(parseInt(investmentAmount) * property.investmentDetails.expectedAnnualReturn / 100 / 12);
  };

  const calculateAnnualReturn = () => {
    if (!investmentAmount || !property) return 0;
    return Math.round(parseInt(investmentAmount) * property.investmentDetails.expectedAnnualReturn / 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8">{error || 'The property you are looking for does not exist.'}</p>
        <Link to="/properties" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/properties')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition"
            >
              <ArrowLeftIcon size={20} className="mr-2" />
              Back to Properties
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-2 rounded-full transition ${
                  isFavorited ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <HeartIcon size={20} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <ShareIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden">
                <img
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.isPopular && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                
                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition"
                    >
                      <ChevronLeftIcon size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition"
                    >
                      <ChevronRightIcon size={20} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        activeImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon size={20} className="mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                  <p className="text-gray-600">{property.address}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{property.priceFormatted}</div>
                  <div className="text-sm text-gray-500">Investment Price</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <TrendingUpIcon size={24} className="text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{property.roi}</div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <BarChart3Icon size={24} className="text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{property.occupancyRate}</div>
                  <div className="text-sm text-gray-600">Occupancy Rate</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <UsersIcon size={24} className="text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{property.investors}</div>
                  <div className="text-sm text-gray-600">Investors</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <BuildingIcon size={24} className="text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-600 capitalize">{property.propertyType}</div>
                  <div className="text-sm text-gray-600">Property Type</div>
                </div>
              </div>
            </div>

            {/* Property Specifications */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {property.bedrooms > 0 && (
                  <div className="flex items-center">
                    <BedIcon size={20} className="text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center">
                    <BathIcon size={20} className="text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">{property.bathrooms}</div>
                      <div className="text-sm text-gray-600">Bathrooms</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <SquareIcon size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium">{property.squareFeet?.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon size={20} className="text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Performance */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Revenue Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent</span>
                      <span className="font-medium">${property.financials.monthlyRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Revenue</span>
                      <span className="font-medium">${property.financials.annualRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating Expenses</span>
                      <span className="font-medium text-red-600">-${property.financials.operatingExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Net Operating Income</span>
                      <span className="font-bold text-green-600">${property.financials.netOperatingIncome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Investment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Investment</span>
                      <span className="font-medium">${property.investmentDetails.minimumInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Period</span>
                      <span className="font-medium">{property.investmentDetails.investmentPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Units</span>
                      <span className="font-medium">{property.investmentDetails.totalUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Shares</span>
                      <span className="font-medium text-blue-600">{property.investmentDetails.availableShares}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon size={16} className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Investment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <h2 className="text-xl font-bold mb-2">Invest in this Property</h2>
                <p className="text-blue-100">Start building your real estate portfolio</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Minimum Investment</span>
                    <span className="font-medium">${property.investmentDetails.minimumInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Expected Annual Return</span>
                    <span className="font-medium text-green-600">{property.investmentDetails.expectedAnnualReturn}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Investment Period</span>
                    <span className="font-medium">{property.investmentDetails.investmentPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Available Shares</span>
                    <span className="font-medium text-blue-600">{property.investmentDetails.availableShares} remaining</span>
                  </div>
                </div>
                
                <form onSubmit={handleInvestmentSubmit}>
                  <div className="mb-4">
                    <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount ($)
                    </label>
                    <input
                      type="number"
                      id="investmentAmount"
                      min={property.investmentDetails.minimumInvestment}
                      step="1000"
                      value={investmentAmount}
                      onChange={handleInvestmentChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Min $${property.investmentDetails.minimumInvestment.toLocaleString()}`}
                      required
                    />
                  </div>
                  
                  {investmentAmount && parseInt(investmentAmount) >= property.investmentDetails.minimumInvestment && (
                    <div className="mb-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-3">Investment Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Your Investment</span>
                            <span className="font-medium">${parseInt(investmentAmount).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Expected Annual Return</span>
                            <span className="font-medium text-green-600">${calculateAnnualReturn().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium text-blue-700 pt-2 border-t border-blue-100">
                            <span>Est. Monthly Income</span>
                            <span>${calculateMonthlyReturn().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={!investmentAmount || parseInt(investmentAmount) < property.investmentDetails.minimumInvestment}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition font-medium mb-4"
                  >
                    Invest Now
                  </button>
                </form>
                
                <div className="text-center">
                  <Link 
                    to="/properties" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View More Properties
                  </Link>
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By investing, you agree to our Terms of Service and Privacy Policy.
                  All investments involve risk and may lose value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;