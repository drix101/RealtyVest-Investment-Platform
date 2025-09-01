import React from 'react';
import { MapPinIcon, BarChart3Icon, TrendingUpIcon, UsersIcon } from 'lucide-react';
export const PropertyCard = ({
  image,
  title,
  location,
  price,
  roi,
  occupancy,
  investors,
  isPopular = false
}) => {
  return <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 sm:h-56 object-cover" />
        {isPopular && <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </div>}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPinIcon size={16} className="mr-1 flex-shrink-0" />
              <span className="text-sm truncate">{location}</span>
            </div>
          </div>
          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium whitespace-nowrap">
            {price}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <div className="flex items-center text-gray-500 mb-1">
              <TrendingUpIcon size={14} className="mr-1" />
              <span>ROI</span>
            </div>
            <span className="font-bold text-blue-700">{roi}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <div className="flex items-center text-gray-500 mb-1">
              <BarChart3Icon size={14} className="mr-1" />
              <span>Occupancy</span>
            </div>
            <span className="font-bold text-blue-700">{occupancy}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <div className="flex items-center text-gray-500 mb-1">
              <UsersIcon size={14} className="mr-1" />
              <span>Investors</span>
            </div>
            <span className="font-bold text-blue-700">{investors}</span>
          </div>
        </div>
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium">
          View Property
        </button>
      </div>
    </div>;
};