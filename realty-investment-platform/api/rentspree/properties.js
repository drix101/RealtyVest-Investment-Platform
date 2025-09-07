import fetch from 'node-fetch';

// Mock properties data (same as your current mockProperties)
const mockProperties = [
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
    squareFeet: 1400,
    yearBuilt: 2019,
    description: 'Spacious apartment with city views',
    amenities: ['City View', 'Gym', 'Parking']
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
    bathrooms: 2,
    squareFeet: 1100,
    yearBuilt: 2014,
    description: 'Cozy apartment with lakeside views',
    amenities: ['Lakeside View', 'Gym', 'Parking'],
    isPopular: true
  },
  {
    id: 5,
    title: 'Sunset Plaza',
    location: 'Phoenix, AZ',
    price: '$290,000',
    roi: '8.3%',
    occupancy: '94%',
    investors: 23,
    type: 'residential',
    image: 'images/apartment-5.png',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    yearBuilt: 2021,
    description: 'Spacious apartment with city views',
    amenities: ['City View', 'Gym', 'Parking'],
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
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1300,
    yearBuilt: 2015,
    description: 'Spacious apartment with city views',
    amenities: ['City View', 'Gym', 'Parking'],
    isPopular: true
  },
  {
    id: 7,
    title: 'Downtown Office',
    location: 'Seattle, WA',
    price: '$1,250,000',
    roi: '7.2%',
    occupancy: '92%',
    investors: 63,
    type: 'Commercial',
    image: 'images/apartment-7.png',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1300,
    yearBuilt: 2015,
    description: 'Spacious apartment with city views',
    amenities: ['City View', 'Office Space', 'Parking lot', 'Concierge'],
    isPopular: true
  },
  {
    id: 8,
    title: 'Riverside Warehouse',
    location: 'Portland, OR',
    price: '$875,000',
    roi: '7.2%',
    occupancy: '100%',
    investors: 45,
    type: 'Industrial',
    image: 'images/apartment-8.png',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1300,
    yearBuilt: 2015,
    description: 'Spacious apartment with garden views',
    amenities: ['Farm View', 'Parking lot', 'Concierge']
  },
  {
    id: 9,
    title: 'Parkside Apartment',
    location: 'Austin, TX',
    price: '$450,000',
    roi: '10.5%',
    occupancy: 'N/A%',
    investors: 17,
    type: 'residential',
    image: 'images/apartment-9.png',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1300,
    yearBuilt: 2015,
    description: 'Spacious apartment with city views',
    amenities: ['Farm View', 'Garden View', 'Parking lot', 'Concierge']
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rentSpreeApiKey = process.env.VITE_RENTSPREE_API_KEY;
    
    if (!rentSpreeApiKey || rentSpreeApiKey === 'your_rentspree_api_key_here') {
      console.log('RentSpree API key not configured, returning mock data');
      return res.status(200).json(mockProperties);
    }

    // Filter out undefined/null query parameters
    const cleanQuery = {};
    Object.entries(req.query).forEach(([key, value]) => {
      if (value && value !== 'undefined' && value !== 'null' && value !== '') {
        cleanQuery[key] = value;
      }
    });

    const queryParams = new URLSearchParams(cleanQuery);
    queryParams.append('api_key', rentSpreeApiKey);
    
    const url = `https://api.rentspree.com/v1/properties?${queryParams.toString()}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log('RentSpree API error, returning mock data');
      return res.status(200).json(mockProperties);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from RentSpree API:', error);
    res.status(200).json(mockProperties);
  }
}