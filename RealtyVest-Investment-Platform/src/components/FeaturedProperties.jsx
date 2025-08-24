import React from 'react'

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      name: "Oakwood Residences",
      location: "Austin, TX",
      price: "$500,000",
      image: "/images/apartment-1.png",
      roi: "12.5%",
      occupancy: "95%",
      premium: "8.2%"
    },
    {
      id: 2,
      name: "Horizon Towers",
      location: "Miami, FL",
      price: "$750,000",
      image: "/images/apartment-2.png",
      roi: "15.2%",
      occupancy: "98%",
      premium: "10.1%"
    },
    {
      id: 3,
      name: "Pine Valley Estate",
      location: "Denver, CO",
      price: "$650,000",
      image: "/images/apartment-3.png",
      roi: "11.8%",
      occupancy: "92%",
      premium: "7.5%"
    },
    {
      id: 4,
      name: "Lakeside Apartments",
      location: "Chicago, IL",
      price: "$450,000",
      image: "/images/apartment-4.png",
      roi: "13.1%",
      occupancy: "96%",
      premium: "8.8%"
    },
    {
      id: 5,
      name: "Sunset Plaza",
      location: "Phoenix, AZ",
      price: "$380,000",
      image: "/images/apartment-5.png",
      roi: "14.3%",
      occupancy: "94%",
      premium: "9.6%"
    },
    {
      id: 6,
      name: "Maple Grove Condos",
      location: "Nashville, TN",
      price: "$520,000",
      image: "/images/apartment-6.png",
      roi: "12.9%",
      occupancy: "97%",
      premium: "8.9%"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Investment Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of high-performing real estate investment opportunities with attractive returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {property.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location}
                </div>

                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {property.price}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">ROI</div>
                    <div className="text-lg font-semibold text-green-600">{property.roi}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Occupancy</div>
                    <div className="text-lg font-semibold text-blue-600">{property.occupancy}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Premium</div>
                    <div className="text-lg font-semibold text-purple-600">{property.premium}</div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition duration-150 ease-in-out">
                  View Property
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium transition duration-150 ease-in-out">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties;