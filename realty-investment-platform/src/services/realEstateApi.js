// Real Estate API Service - Frontend Only (Mock Data)
class RealEstateApiService {
  constructor() {
    // No API keys needed for mock data
  }

  // Generic request method (simplified for mock data)
  async makeRequest(url, options = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return Promise.resolve({});
  }

  // RentSpree API Integration - Mock Data Only
  async getRentSpreeProperties(filters = {}) {
    console.log('Using mock properties data');
    return this.getMockProperties();
  }
  
  // Zillow API Integration - Mock Data Only
  async getZillowPropertyData(address) {
    console.log('Using mock Zillow data');
    return this.getMockZillowData();
  }

  // Walk Score API Integration - Mock Data Only
  async getWalkScore(lat, lon, address) {
    console.log('Using mock Walk Score data');
    return this.getMockWalkScore();
  }

  // Google Maps Geocoding - Mock Data Only
  async geocodeAddress(address) {
    console.log('Using mock geocoding data');
    return this.getMockGeocodeData();
  }

  // Google Places API for nearby amenities - Mock Data Only
  async getNearbyAmenities(lat, lon, type = 'restaurant') {
    console.log('Using mock amenities data');
    return this.getMockAmenitiesData();
  }
  
  // Data transformation methods
  transformRentSpreeData(data) {
    return data.properties?.map(property => ({
      id: property.id,
      title: property.title || property.address,
      location: `${property.city}, ${property.state}`,
      price: `$${property.price?.toLocaleString()}`,
      roi: `${(property.roi || 8.5).toFixed(1)}%`,
      occupancy: `${property.occupancy || 95}%`,
      investors: property.investors || Math.floor(Math.random() * 50) + 10,
      type: property.type || 'residential',
      image: property.images?.[0] || 'images/apartment-1.png',
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFeet,
      yearBuilt: property.yearBuilt,
      description: property.description,
      amenities: property.amenities || []
    })) || [];
  }

  transformZillowData(data) {
    const property = data.response?.results?.result?.[0];
    if (!property) return null;

    return {
      zestimate: property.zestimate?.amount?.['#text'],
      rentZestimate: property.rentzestimate?.amount?.['#text'],
      lastSoldPrice: property.lastSoldPrice?.['#text'],
      lastSoldDate: property.lastSoldDate?.['#text'],
      yearBuilt: property.yearBuilt?.['#text'],
      lotSize: property.lotSizeSqFt?.['#text'],
      finishedSqFt: property.finishedSqFt?.['#text'],
      bedrooms: property.bedrooms?.['#text'],
      bathrooms: property.bathrooms?.['#text']
    };
  }

  transformWalkScoreData(data) {
    return {
      walkScore: data.walkscore || 0,
      transitScore: data.transit?.score || 0,
      bikeScore: data.bike?.score || 0,
      description: data.description || 'Walk Score not available'
    };
  }

  transformGeocodeData(data) {
    const result = data.results?.[0];
    if (!result) return null;

    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
      placeId: result.place_id,
      addressComponents: result.address_components
    };
  }

  transformPlacesData(data) {
    return data.results?.map(place => ({
      name: place.name,
      rating: place.rating,
      vicinity: place.vicinity,
      types: place.types,
      placeId: place.place_id,
      photos: place.photos
    })) || [];
  }

  // Mock data fallbacks
  getMockProperties() {
    return [
      {
        id: 1,
        title: 'Oakwood Residences',
        location: 'Austin, TX',
        price: '$250,000',
        roi: '8.2%',
        occupancy: '97%',
        investors: 42,
        type: 'residential',
        image: 'images/apartment-1.png',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        yearBuilt: 2018,
        description: 'Modern apartment complex in downtown Austin',
        amenities: ['Pool', 'Gym', 'Parking'],
        isPopular: true
      },
      {
        id: 2,
        title: 'Horizon Towers',
        location: 'Miami, FL',
        price: '$420,000',
        roi: '7.5%',
        occupancy: '95%',
        investors: 31,
        type: 'land',
        image: 'images/apartment-2.png',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1500,
        yearBuilt: 2020,
        description: 'Luxury high-rise with ocean views',
        amenities: ['Ocean View', 'Concierge', 'Valet Parking']
      },
      {
        id: 3,
        title: 'Pine Valley Estate',
        location: 'Austin, TX',
        price: '$375,000',
        roi: '9.1%',
        occupancy: '98%',
        investors: 31,
        type: 'residential',
        image: 'images/apartment-3.png',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        yearBuilt: 2019,
        description: 'Spacious estate with beautiful valley views',
        amenities: ['Garden', 'Fireplace', 'Garage']
      },
      {
        id: 4,
        title: 'Lakeside Apartment',
        location: 'Chicago, IL',
        price: '$310,000',
        roi: '8.7%',
        occupancy: '96%',
        investors: 38,
        type: 'residential',
        image: 'images/apartment-4.png',
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 1100,
        yearBuilt: 2017,
        description: 'Cozy apartment with lake views',
        amenities: ['Lake View', 'Balcony', 'Fitness Center']
      },
      {
        id: 5,
        title: 'Sunset Plaza',
        location: 'Phoenix, AZ',
        price: '$290,000',
        roi: '8.3%',
        occupancy: '94%',
        investors: 23,
        type: 'commercial',
        image: 'images/apartment-5.png',
        bedrooms: 0,
        bathrooms: 2,
        squareFeet: 2000,
        yearBuilt: 2015,
        description: 'Prime commercial space in busy plaza',
        amenities: ['Parking Lot', 'Security System', 'Loading Dock'],
        isPopular: true
      },
      {
        id: 6,
        title: 'Maple Groves',
        location: 'Nashville, TN',
        price: '$340,000',
        roi: '7.8%',
        occupancy: '97%',
        investors: 17,
        type: 'residential',
        image: 'images/apartment-6.png',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1600,
        yearBuilt: 2016,
        description: 'Charming home in a quiet neighborhood',
        amenities: ['Backyard', 'Patio', 'Garage']
      },
      {
        id: 7,
        title: 'Downtown Office...',
        location: 'Seattle, WA',
        price: '$1,250,000',
        roi: '6.8%',
        occupancy: '92%',
        investors: 63,
        type: 'commercial',
        image: 'images/apartment-7.png',
        bedrooms: 0,
        bathrooms: 4,
        squareFeet: 5000,
        yearBuilt: 2010,
        description: 'Modern office space in downtown area',
        amenities: ['Conference Rooms', 'Kitchen', 'Parking Garage']
      },
      {
        id: 8,
        title: 'Riverside Warehouse',
        location: 'Portland, OR',
        price: '$875,000',
        roi: '7.2%',
        occupancy: '100%',
        investors: 45,
        type: 'industrial',
        image: 'images/apartment-8.png',
        bedrooms: 0,
        bathrooms: 2,
        squareFeet: 10000,
        yearBuilt: 2008,
        description: 'Spacious warehouse with river access',
        amenities: ['Loading Docks', 'High Ceilings', 'Security System']
      },
      {
        id: 9,
        title: 'Parkside Apartments',
        location: 'Austin, TX',
        price: '$450,000',
        roi: '10.5%',
        occupancy: 'N/A',
        investors: 17,
        type: 'land',
        image: 'images/apartment-9.png',
        bedrooms: 0,
        bathrooms: 0,
        squareFeet: 20000,
        yearBuilt: 0,
        description: 'Prime development land near city park',
        amenities: ['Utilities Ready', 'Zoned Mixed-Use']
      },
      {
        id: 10,
        title: 'Sunset Estates',
        location: 'Phoenix, AZ',
        price: '$290,000',
        roi: '8.3%',
        occupancy: '94%',
        investors: 23,
        type: 'residential',
        image: 'images/apartment-010.png',
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        yearBuilt: 2014,
        description: 'Luxury estate with mountain views',
        amenities: ['Pool', 'Spa', 'Outdoor Kitchen'],
        isPopular: true
      },
      {
        id: 11,
        title: 'Mountain View Apartments',
        location: 'Denver, CO',
        price: '$360,000',
        roi: '9.2%',
        occupancy: '95%',
        investors: 28,
        type: 'residential',
        image: 'images/apartment-011.png',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1300,
        yearBuilt: 2018,
        description: 'Modern apartments with mountain views',
        amenities: ['Balcony', 'Fitness Center', 'Community Room']
      },
      {
        id: 12,
        title: 'Cityscape Apartments',
        location: 'New York, NY',
        price: '$480,000',
        roi: '8.9%',
        occupancy: '96%',
        investors: 35,
        type: 'residential',
        image: 'images/apartment-012.png',
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 900,
        yearBuilt: 2019,
        description: 'Luxury apartment with city views',
        amenities: ['Doorman', 'Rooftop Terrace', 'Gym']
      }
    ];
  }

  getMockZillowData() {
    return {
      zestimate: 350000,
      rentZestimate: 2500,
      lastSoldPrice: 320000,
      lastSoldDate: '2023-01-15',
      yearBuilt: 2018,
      lotSize: 5000,
      finishedSqFt: 1200,
      bedrooms: 2,
      bathrooms: 2
    };
  }

  getMockWalkScore() {
    return {
      walkScore: 75,
      transitScore: 60,
      bikeScore: 80,
      description: 'Very Walkable - Most errands can be accomplished on foot'
    };
  }

  getMockGeocodeData() {
    return {
      lat: 30.2672,
      lng: -97.7431,
      formattedAddress: 'Austin, TX, USA',
      placeId: 'ChIJAVkDPzdZRIYRVtcgV2QcvPo',
      addressComponents: []
    };
  }

  getMockAmenitiesData() {
    return [
      {
        name: 'Local Restaurant',
        rating: 4.5,
        vicinity: '123 Main St',
        types: ['restaurant', 'food'],
        placeId: 'mock_place_id_1'
      },
      {
        name: 'Coffee Shop',
        rating: 4.2,
        vicinity: '456 Oak Ave',
        types: ['cafe', 'food'],
        placeId: 'mock_place_id_2'
      }
    ];
  }
}

export default new RealEstateApiService();
