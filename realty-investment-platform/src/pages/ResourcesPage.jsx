import React, { useState } from 'react';
import { BookOpenIcon, FileTextIcon, CalculatorIcon, TrendingUpIcon, SearchIcon } from 'lucide-react';
export const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [{
    id: 'all',
    name: 'All Resources'
  }, {
    id: 'guides',
    name: 'Investment Guides'
  }, {
    id: 'market',
    name: 'Market Reports'
  }, {
    id: 'tutorials',
    name: 'Tutorials'
  }, {
    id: 'tools',
    name: 'Calculators & Tools'
  }];
  const resources = [{
    title: "Beginner's Guide to Real Estate Investing",
    description: "Learn the fundamentals of real estate investing, key terms, strategies, and how to evaluate your first property.",
    category: "guides",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    featured: true,
    date: "June 15, 2023"
  }
  // ... other resources
  ];
  const filteredResources = resources.filter(resource => activeCategory === 'all' || resource.category === activeCategory).filter(resource => resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const featuredResources = filteredResources.filter(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);
  const getCategoryIcon = category => {
    switch (category) {
      case 'guides':
        return <BookOpenIcon size={18} className="text-blue-600" />;
      case 'market':
        return <TrendingUpIcon size={18} className="text-green-600" />;
      case 'tutorials':
        return <FileTextIcon size={18} className="text-purple-600" />;
      case 'tools':
        return <CalculatorIcon size={18} className="text-amber-600" />;
      default:
        return <BookOpenIcon size={18} className="text-blue-600" />;
    }
  };
  const getCategoryLabel = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  const getCategoryClass = category => {
    switch (category) {
      case 'guides':
        return 'bg-blue-50 text-blue-700';
      case 'market':
        return 'bg-green-50 text-green-700';
      case 'tutorials':
        return 'bg-purple-50 text-purple-700';
      case 'tools':
        return 'bg-amber-50 text-amber-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  return <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <div className="bg-blue-700 py-10 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Investment Resources
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
            Access our library of guides, market reports, tutorials, and tools to help you make smarter real estate investment decisions.
          </p>
          {/* Search - Mobile Optimized */}
          <div className="max-w-2xl mx-auto relative">
            <SearchIcon size={20} className="absolute left-4 top-3.5 text-gray-400" />
            <input type="text" placeholder="Search resources..." className="w-full pl-12 pr-4 py-3 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>
      {/* Category Tabs - Mobile Optimized */}
      <div className="bg-white border-b sticky top-[60px] z-30">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto py-2 px-4 -mx-4 space-x-2 sm:space-x-4 hide-scrollbar">
            {categories.map(category => <button key={category.id} className={`px-3 sm:px-4 py-2 whitespace-nowrap text-sm font-medium rounded-lg flex-shrink-0 ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </button>)}
          </div>
        </div>
      </div>
      {/* Main Content - Mobile Optimized */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Featured Resources - Mobile Optimized */}
        {featuredResources.length > 0 && <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredResources.map((resource, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-40 sm:h-48">
                    <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-3 right-3 ${getCategoryClass(resource.category)} text-xs font-bold px-3 py-1 rounded-full`}>
                      {getCategoryLabel(resource.category)}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex-grow flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{resource.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-gray-500">{resource.date}</span>
                      <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>}
        {/* All Resources - Mobile Optimized */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            {activeCategory === 'all' ? 'All Resources' : getCategoryLabel(activeCategory)}
          </h2>
          {filteredResources.length === 0 ? <div className="bg-white rounded-xl p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {regularResources.map((resource, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-40 sm:h-48">
                    <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-3 right-3 ${getCategoryClass(resource.category)} text-xs font-bold px-3 py-1 rounded-full`}>
                      {getCategoryLabel(resource.category)}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex-grow flex flex-col">
                    <div className="flex items-center mb-3">
                      {getCategoryIcon(resource.category)}
                      <span className="ml-2 text-sm text-gray-500">{resource.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{resource.description}</p>
                    <button className="text-blue-600 font-medium hover:text-blue-800 mt-auto">
                      Read More
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>
        {/* Newsletter - Mobile Optimized */}
        <div className="mt-10 sm:mt-16 bg-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Stay Updated with Market Insights
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8">
              Subscribe to our newsletter to receive the latest market reports, investment guides, and exclusive opportunities directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive marketing emails from RealtyVest. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      {/* Add custom styles for hiding scrollbar but allowing scrolling */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>;
};