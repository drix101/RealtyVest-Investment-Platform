import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, SlidersIcon, GridIcon, ListIcon, MapPinIcon, XIcon, LoaderIcon } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { usePropertiesStore } from '../store/usePropertiesStore';
import dataService from '../services/dataService';

export const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [marketData, setMarketData] = useState(null);
  
  // Remove the 'new' keyword since dataService is already an instance
  // const dataService = new DataService(); // Remove this line
  
  const {
    viewMode,
    setViewMode,
    activeFilter,
    setActiveFilter,
    showFilters,
    setShowFilters,
    currentPage,
    setCurrentPage,
    propertiesPerPage,
    totalPages,
  } = usePropertiesStore();

  // Initialize search term from URL parameters
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  // Load properties and market data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Load properties from data.json using DataService
        const propertiesData = await dataService.getProperties({
          type: activeFilter === 'all' ? undefined : activeFilter,
          search: searchTerm
        });
        setProperties(propertiesData);

        // Load investment metrics as market data
        const investmentMetrics = await dataService.getInvestmentMetrics();
        setMarketData(investmentMetrics);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load properties. Please try again.');
        
        // Fallback to mock data
        setProperties(getMockProperties());
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeFilter, searchTerm]);

  // Mock data fallback function (keeping as backup)
  const getMockProperties = () => [
    {
      id: 1,
      image: '/images/apartment-1.png',
      title: 'Oakwood Residences',
      location: 'Austin, TX',
      price: '$250,000',
      roi: '8.2%',
      occupancy: '97%',
      investors: 42,
      isPopular: true,
      type: 'residential'
    },
    {
      id: 2,
      image: 'images/apartment-2.png',
      title: 'Horizon Towers', 
      location: 'Miami, FL',
      price: '$420,000',
      roi: '7.5%',
      occupancy: '95%',
      investors: 31,
      type: 'land' 
    },
    {
      id: 3,
      image: 'images/apartment-3.png',
      title: 'Pine Valley Estate',
      location: 'Austin, TX',
      price: '$375,000',
      roi: '9.1%',
      occupancy: '98%',
      investors: 31,
      type: 'residential'
    },
    {
      id: 4,
      image: 'images/apartment-4.png',
      title: 'Lakeside Apartment',
      location: 'Chicago, IL',
      price: '$310,000',
      roi: '8.7%',
      occupancy: '96%',
      investors: 38,
      type: 'residential'
    },
    {
      id: 5,
      image: 'images/apartment-5.png',
      title: 'Sunset Plaza',
      location: 'Phoenix, AZ',
      price: '$290,000',
      roi: '8.3%',
      occupancy: '94%',
      investors: 23,
      isPopular: true,
      type: 'commercial'
    },
    {
      id: 6,
      image: 'images/apartment-6.png',
      title: 'Maple Groves',
      location: 'Nashville, TN',
      price: '$340,000',
      roi: '7.8%',
      occupancy: '97%',
      investors: 17,
      type: 'residential'
    },
    {
      id: 7,
      image: 'images/apartment-7.png',
      title: 'Downtown Office...',
      location: 'Seattle, WA',
      price: '$1,250,000',
      roi: '6.8%',
      occupancy: '92%',
      investors: 63,
      type: 'commercial'
    },
    {
      id: 8,
      image: 'images/apartment-8.png',
      title: 'Riverside Warehouse',
      location: 'Portland, OR',
      price: '$875,000',
      roi: '7.2%',
      occupancy: '100%',
      investors: 45,
      type: 'industrial'
    },
    {
      id: 9,
      image: 'images/apartment-9.png',
      title: 'Parkside Apartments',
      location: 'Austin, TX',
      price: '$450,000',
      roi: '10.5%',
      occupancy: 'N/A',
      investors: 17,
      type: 'land'
    },
    {
      id: 10,
      image: 'images/apartment-010.png',
      title: 'Sunset Estates',
      location: 'Phoenix, AZ',
      price: '$290,000',
      roi: '8.3%',
      occupancy: '94%',
      investors: 23,
      isPopular: true,
      type: 'residential'
    },
    {
      id: 11,
      image: 'images/apartment-011.png',
      title: 'Mountain View Apartments',
      location: 'Denver, CO',
      price: '$360,000',
      roi: '9.2%',
      occupancy: '95%',
      investors: 28,
      type: 'residential'
    },
    {
      id: 12,
      image: 'images/apartment-012.png',
      title: 'Cityscape Apartments',
      location: 'New York, NY',
      price: '$480,000',
      roi: '8.9%',
      occupancy: '96%',
      investors: 35,
      type: 'residential'
    }
  ];

  // Enhanced filtering logic to include location search
  const filteredProperties = properties.filter(property => {
    // Filter by property type
    const typeMatch = activeFilter === 'all' || property.propertyType === activeFilter;
    
    // Filter by search term (location)
    const searchMatch = !searchTerm || 
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  // Calculate dynamic total pages based on filtered properties
  const calculatedTotalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Pagination logic
  const startIdx = (currentPage - 1) * propertiesPerPage;
  const endIdx = startIdx + propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    if (page < 1 || page > calculatedTotalPages) return;
    setCurrentPage(page);
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, setCurrentPage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <div className="bg-blue-700 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Investment Properties
          </h1>
          <p className="text-blue-100 max-w-l mb-6 sm:mb-8 text-sm sm:text-base">
            Browse our curated selection of high-performing investment properties across multiple markets and asset classes.
          </p>
          {/* Search Bar - Mobile Optimized */}
          <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col gap-3">
            <div className="relative">
              <SearchIcon size={20} className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search properties..." 
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center justify-center transition"
              onClick={() => {
                // Optional: You can add additional search logic here
              }}
            >
              Search Properties
            </button>
          </div>
        </div>
      </div>
      {/* Main Content - Mobile Optimized */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters - Desktop (Hidden on Mobile) */}
          <div className="hidden lg:block w-64 bg-white shadow-md rounded-lg p-6 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Property Type
              </h3>
              <div className="space-y-2">
                <button className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'all' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => setActiveFilter('all')}>
                  All Properties
                </button>
                <button className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'residential' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => setActiveFilter('residential')}>
                  Residential
                </button>
                <button className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'commercial' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => setActiveFilter('commercial')}>
                  Commercial
                </button>
                <button className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'industrial' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => setActiveFilter('industrial')}>
                  Industrial
                </button>
                <button className={`w-full text-left px-3 py-2 rounded ${activeFilter === 'land' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`} onClick={() => setActiveFilter('land')}>
                  Land
                </button>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Price Range
              </h3>
              <div className="flex items-center justify-between gap-2">
                <input type="text" placeholder="Min" className="w-full p-2 rounded border border-gray-200 text-sm" />
                <span className="text-gray-400">to</span>
                <input type="text" placeholder="Max" className="w-full p-2 rounded border border-gray-200 text-sm" />
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Min. ROI
              </h3>
              <select className="w-full p-2 rounded border border-gray-200">
                <option>Any</option>
                <option>5%+</option>
                <option>6%+</option>
                <option>7%+</option>
                <option>8%+</option>
                <option>9%+</option>
                <option>10%+</option>
              </select>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Location
              </h3>
              <select className="w-full p-2 rounded border border-gray-200">
                <option>Any Location</option>
                <option>Austin, TX</option>
                <option>Miami, FL</option>
                <option>Denver, CO</option>
                <option>Chicago, IL</option>
                <option>Phoenix, AZ</option>
                <option>Nashville, TN</option>
                <option>Seattle, WA</option>
                <option>Portland, OR</option>
                <option>San Francisco, CA</option>
                <option>Los Angeles, CA</option>
                <option>San Diego, CA</option>
                <option>New York, NY</option>
                <option>Boston, MA</option>
                <option>Washington, DC</option>
                <option>Philadelphia, PA</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium">
              Apply Filters
            </button>
          </div>
          {/* Properties Section - Mobile Optimized */}
          <div className="flex-1">
            {/* Controls - Mobile Optimized */}
            <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-3">
              <div className="flex items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {filteredProperties.length} Properties
                  {searchTerm && ` in "${searchTerm}"`}
                </h2>
                <button onClick={() => setShowFilters(!showFilters)} className="ml-3 lg:hidden flex items-center text-blue-600 font-medium bg-blue-50 px-3 py-1.5 rounded-md" aria-label={showFilters ? 'Hide filters' : 'Show filters'}>
                  <SlidersIcon size={16} className="mr-1" />
                  Filters
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex border rounded overflow-hidden">
                  <button className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 bg-white'}`} onClick={() => setViewMode('grid')} aria-label="Grid view">
                    <GridIcon size={18} />
                  </button>
                  <button className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 bg-white'}`} onClick={() => setViewMode('list')} aria-label="List view">
                    <ListIcon size={18} />
                  </button>
                </div>
                <select className="p-2 rounded border border-gray-200 text-sm bg-white">
                  <option>Sort: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>ROI: Highest First</option>
                </select>
              </div>
            </div>
            {/* Mobile Filters Drawer - Improved for Mobile */}
            {showFilters && <div className="lg:hidden fixed inset-0 bg-gray-900/50 z-50 flex flex-col">
                <div className="mt-auto bg-white rounded-t-xl shadow-lg max-h-[85vh] overflow-auto">
                  <div className="p-4 border-b sticky top-0 bg-white z-10">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800 text-lg">
                        Filters
                      </h3>
                      <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setShowFilters(false)} aria-label="Close filters">
                        <XIcon size={20} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-600 mb-3">
                        Property Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <button className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('all')}>
                          All
                        </button>
                        <button className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'residential' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('residential')}>
                          Residential
                        </button>
                        <button className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'commercial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('commercial')}>
                          Commercial
                        </button>
                        <button className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'industrial' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('industrial')}>
                          Industrial
                        </button>
                        <button className={`px-4 py-2 rounded-full text-sm ${activeFilter === 'land' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('land')}>
                          Land
                        </button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">
                        Price Range
                      </h4>
                      <select className="w-full p-3 rounded-lg border border-gray-200 text-base bg-white">
                        <option>Any Price</option>
                        <option>Under $250k</option>
                        <option>$250k - $500k</option>
                        <option>$500k - $1M</option>
                        <option>$1M+</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">
                        Min. ROI
                      </h4>
                      <select className="w-full p-3 rounded-lg border border-gray-200 text-base bg-white">
                        <option>Any</option>
                        <option>5%+</option>
                        <option>7%+</option>
                        <option>9%+</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">
                        Location
                      </h4>
                      <select className="w-full p-3 rounded-lg border border-gray-200 text-base bg-white">
                       <option>Any Location</option>
                       <option>Austin, TX</option>
                       <option>Miami, FL</option>
                       <option>Denver, CO</option>
                       <option>Chicago, IL</option>
                       <option>Phoenix, AZ</option>
                       <option>Nashville, TN</option>
                       <option>Seattle, WA</option>
                       <option>Portland, OR</option>
                       <option>San Francisco, CA</option>
                       <option>Los Angeles, CA</option>
                       <option>San Diego, CA</option>
                       <option>New York, NY</option>
                       <option>Boston, MA</option>
                       <option>Washington, DC</option>
                       <option>Philadelphia, PA</option>
                      </select> 
                    </div>
                    <div className="sticky bottom-0 pt-4 pb-4 bg-white">
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 border border-gray-300 rounded-lg font-medium" onClick={() => setShowFilters(false)}>
                          Cancel
                        </button>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium" onClick={() => setShowFilters(false)}>
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <LoaderIcon className="h-8 w-8 text-blue-600 animate-spin mr-3" />
                <span className="text-gray-600">Loading properties...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="text-red-600 mr-3">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Error loading properties</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Market Data Display */}
            {marketData && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Market Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <span className="text-sm text-gray-600">Avg. ROI</span>
                    <span className="ml-1 text-blue-800">{marketData.averageROI}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Properties</span>
                    <span className="ml-1 text-blue-800">{marketData.totalProperties}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Investors</span>
                    <span className="ml-1 text-blue-800">{marketData.totalInvestors}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Avg. Occupancy</span>
                    <span className="ml-1 text-blue-800">{marketData.averageOccupancy}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Property Grid/List - Mobile Optimized */}
            {!loading && !error && (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4'}`}>
                {viewMode === 'grid' ? (
                  paginatedProperties.map((property, index) => (
                    <PropertyCard 
                      key={property.id || index} 
                      id={property.id}
                      image={property.images?.[0] || property.image}
                      title={property.title}
                      location={property.location}
                      price={property.priceFormatted || property.price}
                      roi={property.roi}
                      occupancy={property.occupancyRate || property.occupancy}
                      investors={property.investors}
                      isPopular={property.isPopular}
                      propertyType={property.propertyType || property.type}
                    />
                  ))
                ) : (
                  paginatedProperties.map((property, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img src={property.images?.[0] || property.image} alt={property.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-4">
                            <MapPinIcon size={16} className="mr-1 flex-shrink-0" />
                            <span className="text-sm">
                              {property.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {property.priceFormatted || property.price}
                          </div>
                          <div className="flex space-x-4 text-sm">
                            <div>
                              <span className="text-gray-500">ROI:</span>
                              <span className="font-medium text-green-600 ml-1">
                                {property.roi}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Occupancy:</span>
                              <span className="font-medium ml-1">
                                {property.occupancyRate || property.occupancy}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Investors:</span>
                              <span className="font-medium ml-1">
                                {property.investors}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Pagination - Mobile Optimized */}
            {!loading && !error && filteredProperties.length > propertiesPerPage && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  className={`px-2 sm:px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {/* Show page numbers with smart pagination */}
                {(() => {
                  const pages = [];
                  const maxVisiblePages = 5;
                  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                  let endPage = Math.min(calculatedTotalPages, startPage + maxVisiblePages - 1);
                  
                  // Adjust start page if we're near the end
                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                  }
                  
                  // Add first page and ellipsis if needed
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        className={`px-2 sm:px-3 py-1 rounded border ${currentPage === 1 ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
                    }
                  }
                  
                  // Add visible page numbers
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        className={`px-2 sm:px-3 py-1 rounded border ${currentPage === i ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(i)}
                      >
                        {i}
                      </button>
                    );
                  }
                  
                  // Add ellipsis and last page if needed
                  if (endPage < calculatedTotalPages) {
                    if (endPage < calculatedTotalPages - 1) {
                      pages.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
                    }
                    pages.push(
                      <button
                        key={calculatedTotalPages}
                        className={`px-2 sm:px-3 py-1 rounded border ${currentPage === calculatedTotalPages ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(calculatedTotalPages)}
                      >
                        {calculatedTotalPages}
                      </button>
                    );
                  }
                  
                  return pages;
                })()}
                
                <button
                  className={`px-2 sm:px-3 py-1 rounded border ${currentPage === calculatedTotalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === calculatedTotalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};