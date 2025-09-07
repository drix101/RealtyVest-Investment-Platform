import fetch from 'node-fetch';

// Mock data (same as your current mockProperties)
const mockProperties = [
  // ... your existing mock data
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