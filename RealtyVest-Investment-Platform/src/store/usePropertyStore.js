import { create } from 'zustand';

export const usePropertyStore = create((set, get) => ({
  // Property data with detailed information
  properties: {
    'oakwood-residences': {
      id: 'oakwood-residences',
      title: 'Oakwood Residences',
      location: 'Austin, TX',
      price: 250000,
      roi: 8.2,
      occupancy: 97,
      investors: 42,
      type: 'residential',
      description: 'A modern residential complex featuring luxury amenities and prime location in the heart of Austin. This property offers excellent rental income potential with high occupancy rates.',
      features: {
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        yearBuilt: 2020,
        parking: 1
      },
      financials: {
        monthlyRent: 2800,
        annualIncome: 33600,
        expenses: 8400,
        netIncome: 25200,
        capRate: 8.2,
        cashOnCash: 12.5
      },
      images: {
        main: '/images/apartment-1.png',
        interior: [
          '/images/apartment-1.png',
          '/images/apartment-2.png',
          '/images/apartment-3.png',
          '/images/apartment-4.png',
          '/images/apartment-5.png'
        ],
        exterior: [
          '/images/apartment-6.png',
          '/images/apartment-7.png',
          '/images/apartment-8.png',
          '/images/apartment-9.png'
        ],
        amenities: [
          '/images/apartment-1.png',
          '/images/apartment-2.png'
        ]
      },
      amenities: [
        'Swimming Pool',
        'Fitness Center',
        'Business Center',
        'Pet Friendly',
        'In-Unit Laundry',
        'Balcony/Patio',
        'Central Air',
        'Dishwasher'
      ],
      neighborhood: {
        crimeRate: 'Low',
        walkScore: 85,
        transitScore: 78,
        bikeScore: 92,
        nearbySchools: 4,
        nearbyRestaurants: 12
      },
      investmentTerms: {
        minInvestment: 5000,
        maxInvestment: 50000,
        availableShares: 100,
        soldShares: 42,
        projectedReturn: 8.2,
        investmentPeriod: '5 years',
        exitStrategy: 'Sale or refinance'
      }
    },
    'horizon-towers': {
      id: 'horizon-towers',
      title: 'Horizon Towers',
      location: 'Miami, FL',
      price: 420000,
      roi: 7.5,
      occupancy: 95,
      investors: 31,
      type: 'land',
      description: 'Prime development land in the heart of Miami with excellent growth potential. This property is zoned for mixed-use development and offers significant appreciation opportunities.',
      features: {
        squareFeet: 50000,
        yearBuilt: 'N/A',
        zoning: 'Mixed-Use',
        lotSize: '1.15 acres'
      },
      financials: {
        projectedValue: 650000,
        developmentCost: 180000,
        netProfit: 470000,
        capRate: 7.5,
        cashOnCash: 15.2
      },
      images: {
        main: '/images/apartment-2.png',
        exterior: [
          '/images/apartment-2.png',
          '/images/apartment-3.png',
          '/images/apartment-4.png'
        ],
        aerial: [
          '/images/apartment-5.png',
          '/images/apartment-6.png'
        ]
      },
      neighborhood: {
        crimeRate: 'Low',
        walkScore: 78,
        transitScore: 85,
        bikeScore: 88,
        nearbySchools: 3,
        nearbyRestaurants: 15
      },
      investmentTerms: {
        minInvestment: 10000,
        maxInvestment: 100000,
        availableShares: 50,
        soldShares: 31,
        projectedReturn: 7.5,
        investmentPeriod: '3-5 years',
        exitStrategy: 'Development and sale'
      }
    },
    'sunset-plaza': {
      id: 'sunset-plaza',
      title: 'Sunset Plaza',
      location: 'Phoenix, AZ',
      price: 290000,
      roi: 8.3,
      occupancy: 94,
      investors: 23,
      type: 'commercial',
      description: 'A well-established commercial property in a high-traffic area of Phoenix. This retail space offers stable rental income with long-term tenants.',
      features: {
        squareFeet: 3500,
        yearBuilt: 2018,
        parking: 25,
        tenantType: 'Retail'
      },
      financials: {
        monthlyRent: 3200,
        annualIncome: 38400,
        expenses: 9600,
        netIncome: 28800,
        capRate: 8.3,
        cashOnCash: 13.8
      },
      images: {
        main: '/images/apartment-5.png',
        interior: [
          '/images/apartment-5.png',
          '/images/apartment-6.png',
          '/images/apartment-7.png'
        ],
        exterior: [
          '/images/apartment-8.png',
          '/images/apartment-9.png'
        ]
      },
      amenities: [
        'High Visibility Location',
        'Ample Parking',
        'Loading Dock',
        'Security System',
        'HVAC System',
        'ADA Compliant'
      ],
      neighborhood: {
        crimeRate: 'Low',
        walkScore: 72,
        transitScore: 68,
        bikeScore: 75,
        nearbyBusinesses: 8,
        footTraffic: 'High'
      },
      investmentTerms: {
        minInvestment: 7500,
        maxInvestment: 75000,
        availableShares: 80,
        soldShares: 23,
        projectedReturn: 8.3,
        investmentPeriod: '5 years',
        exitStrategy: 'Sale or refinance'
      }
    },
    'downtown-office': {
      id: 'downtown-office',
      title: 'Downtown Office Complex',
      location: 'Seattle, WA',
      price: 1250000,
      roi: 6.8,
      occupancy: 92,
      investors: 63,
      type: 'commercial',
      description: 'A prestigious office building in downtown Seattle with high-profile tenants and excellent location. This property offers stable income with premium rental rates.',
      features: {
        squareFeet: 25000,
        yearBuilt: 2015,
        parking: 100,
        floors: 8,
        tenantType: 'Office'
      },
      financials: {
        monthlyRent: 85000,
        annualIncome: 1020000,
        expenses: 255000,
        netIncome: 765000,
        capRate: 6.8,
        cashOnCash: 11.2
      },
      images: {
        main: '/images/apartment-7.png',
        interior: [
          '/images/apartment-7.png',
          '/images/apartment-8.png',
          '/images/apartment-9.png'
        ],
        exterior: [
          '/images/apartment-1.png',
          '/images/apartment-2.png'
        ]
      },
      amenities: [
        '24/7 Security',
        'Concierge Service',
        'Conference Rooms',
        'Fitness Center',
        'Underground Parking',
        'High-Speed Internet',
        'Building Management'
      ],
      neighborhood: {
        crimeRate: 'Very Low',
        walkScore: 95,
        transitScore: 92,
        bikeScore: 88,
        nearbyBusinesses: 25,
        footTraffic: 'Very High'
      },
      investmentTerms: {
        minInvestment: 25000,
        maxInvestment: 250000,
        availableShares: 200,
        soldShares: 63,
        projectedReturn: 6.8,
        investmentPeriod: '7 years',
        exitStrategy: 'Sale or refinance'
      }
    }
  },

  // Actions
  getProperty: (propertyId) => {
    const { properties } = get();
    return properties[propertyId] || null;
  },

  getAllProperties: () => {
    const { properties } = get();
    return Object.values(properties);
  },

  getPropertiesByType: (type) => {
    const { properties } = get();
    return Object.values(properties).filter(property => property.type === type);
  },

  getPropertiesByLocation: (location) => {
    const { properties } = get();
    return Object.values(properties).filter(property => 
      property.location.toLowerCase().includes(location.toLowerCase())
    );
  },

  getPropertiesByROI: (minROI) => {
    const { properties } = get();
    return Object.values(properties).filter(property => property.roi >= minROI);
  },

  getPropertiesByPriceRange: (minPrice, maxPrice) => {
    const { properties } = get();
    return Object.values(properties).filter(property => 
      property.price >= minPrice && property.price <= maxPrice
    );
  },

  searchProperties: (searchTerm) => {
    const { properties } = get();
    const term = searchTerm.toLowerCase();
    return Object.values(properties).filter(property => 
      property.title.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term) ||
      property.description.toLowerCase().includes(term)
    );
  },

  getInvestmentSummary: (propertyId, investmentAmount) => {
    const property = get().getProperty(propertyId);
    if (!property || !investmentAmount) return null;

    const sharePrice = property.price / property.investmentTerms.availableShares;
    const shares = Math.floor(investmentAmount / sharePrice);
    const annualReturn = investmentAmount * (property.roi / 100);
    const monthlyIncome = annualReturn / 12;

    return {
      shares,
      sharePrice,
      annualReturn,
      monthlyIncome,
      totalInvestment: shares * sharePrice,
      remainingShares: property.investmentTerms.availableShares - property.investmentTerms.soldShares
    };
  },

  // Investment tracking
  userInvestments: {},

  addInvestment: (propertyId, investmentData) => {
    set((state) => ({
      userInvestments: {
        ...state.userInvestments,
        [propertyId]: {
          ...state.userInvestments[propertyId],
          ...investmentData,
          date: new Date().toISOString()
        }
      }
    }));
  },

  getUserInvestments: () => {
    const { userInvestments } = get();
    return userInvestments;
  },

  getTotalInvested: () => {
    const { userInvestments } = get();
    return Object.values(userInvestments).reduce((total, investment) => 
      total + (investment.amount || 0), 0
    );
  },

  getTotalReturns: () => {
    const { userInvestments, properties } = get();
    return Object.entries(userInvestments).reduce((total, [propertyId, investment]) => {
      const property = properties[propertyId];
      if (!property) return total;
      return total + (investment.amount * (property.roi / 100));
    }, 0);
  }
}));
