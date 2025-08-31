import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, SlidersIcon, GridIcon, ListIcon, MapPinIcon, XIcon } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { usePropertiesStore } from '../store/usePropertiesStore';

export const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const properties = [{
    image: 'images/apartment-1.png',
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
    const typeMatch = activeFilter === 'all' || property.type === activeFilter;
    
    // Filter by search term (location)
    const searchMatch = !searchTerm || 
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  // Pagination logic
  const startIdx = (currentPage - 1) * propertiesPerPage;
  const endIdx = startIdx + propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <div className="bg-blue-700 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Investment Properties
          </h1>
          <p className="text-blue-100 max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base">
            Browse our curated selection of high-performing investment
            properties across multiple markets and asset classes.
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
            {/* ... existing desktop filter content ... */}
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
            {/* Property Grid/List - Mobile Optimized */}
            {viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedProperties.map((property, index) => <PropertyCard key={index} {...property} />)}
              </div> : <div className="space-y-4">
                {paginatedProperties.map((property, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 md:p-5 md:w-2/3 flex flex-col">
                      <div className="flex justify-between items-start mb-3 md:mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                            {property.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPinIcon size={16} className="mr-1 flex-shrink-0" />
                            <span className="text-sm truncate">
                              {property.location}
                            </span>
                          </div>
                        </div>
                        <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium whitespace-nowrap">
                          {property.price}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div>
                          <div className="text-gray-500 text-sm">ROI</div>
                          <div className="font-bold text-blue-700">
                            {property.roi}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-sm">Occupancy</div>
                          <div className="font-bold text-blue-700">
                            {property.occupancy}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-sm">Investors</div>
                          <div className="font-bold text-blue-700">
                            {property.investors}
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition font-medium">
                          View Property
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>}
            {/* Pagination - Mobile Optimized */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <nav className="flex items-center space-x-1 sm:space-x-2">
                <button
                  className="px-2 sm:px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    className={`px-2 sm:px-3 py-1 rounded border ${currentPage === page ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1 sm:px-2 text-gray-500">...</span>
                <button
                  className={`px-2 sm:px-3 py-1 rounded border ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </button>
                <button
                  className="px-2 sm:px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};