import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';


// ES module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// API keys from environment variables
const API_KEYS = {
  rentSpree: process.env.VITE_RENTSPREE_API_KEY,
  zillow: process.env.VITE_ZILLOW_API_KEY,
  walkScore: process.env.VITE_WALKSCORE_API_KEY,
  googleMaps: process.env.VITE_GOOGLE_MAPS_API_KEY
};

// Add this mock data at the top of your file, after the imports

// Mock properties data for fallback
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
    amenities: ['City View', 'Gym', 'Parking'],
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
    amenities: ['Farm View', 'Parking lot', 'Concierge'],
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
    amenities: ['Farm View', 'Garden View', 'Parking lot', 'Concierge'],
  },
];


// RentSpree API proxy endpoint
app.get('/api/rentspree/properties', async (req, res) => {
  try {
    // Check if we have a valid API key
    if (!API_KEYS.rentSpree || API_KEYS.rentSpree === 'your_rentspree_api_key_here') {
      console.log('Using mock data because RentSpree API key is not configured');
      return res.json({ properties: mockProperties });
    }
    
    // Get query parameters from the request and filter out undefined/null values
    const { type, search, ...otherParams } = req.query;
    
    // Build query parameters for the RentSpree API, filtering out undefined values
    const validParams = {
      api_key: API_KEYS.rentSpree,
      ...(type && type !== 'undefined' && { type }),
      ...(search && search !== 'undefined' && { search }),
      ...Object.fromEntries(
        Object.entries(otherParams).filter(([key, value]) => 
          value !== undefined && value !== 'undefined' && value !== null && value !== ''
        )
      )
    };
    
    const queryParams = new URLSearchParams(validParams);
    
    // Make the request to RentSpree API
    const response = await fetch(`https://api.rentspree.com/v1/properties?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`RentSpree API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('RentSpree API proxy error:', error);
    // Return mock data instead of an error
    res.json({ properties: mockProperties });
  }
});

// Zillow API proxy endpoint
app.get('/api/zillow/property/:zpid', async (req, res) => {
  try {
    const { zpid } = req.params;
    
    // Make the request to Zillow API
    const response = await fetch(`https://api.zillow.com/webservice/GetZestimate.htm?zws-id=${API_KEYS.zillow}&zpid=${zpid}`);
    
    if (!response.ok) {
      throw new Error(`Zillow API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Zillow API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// WalkScore API proxy endpoint
app.get('/api/walkscore', async (req, res) => {
  try {
    const { address, lat, lon } = req.query;
    
    // Make the request to WalkScore API
    const response = await fetch(`https://api.walkscore.com/score?format=json&address=${encodeURIComponent(address)}&lat=${lat}&lon=${lon}&wsapikey=${API_KEYS.walkScore}`);
    
    if (!response.ok) {
      throw new Error(`WalkScore API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('WalkScore API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Google Maps Geocoding API proxy endpoint
app.get('/api/geocode', async (req, res) => {
  try {
    const { address } = req.query;
    
    // Make the request to Google Maps Geocoding API
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEYS.googleMaps}`);
    
    if (!response.ok) {
      throw new Error(`Google Maps Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Google Maps Geocoding API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Google Maps Places API proxy endpoint
app.get('/api/places/nearby', async (req, res) => {
  try {
    const { location, radius, type } = req.query;
    
    // Make the request to Google Maps Places API
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEYS.googleMaps}`);
    
    if (!response.ok) {
      throw new Error(`Google Maps Places API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Google Maps Places API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});