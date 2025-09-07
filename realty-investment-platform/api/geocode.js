import fetch from 'node-fetch';

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
    const { address } = req.query;
    const googleMapsApiKey = process.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!googleMapsApiKey || googleMapsApiKey === 'your_google_maps_api_key_here') {
      return res.status(400).json({ error: 'Google Maps API key not configured' });
    }
    
    // Make the request to Google Maps Geocoding API
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`);
    
    if (!response.ok) {
      throw new Error(`Google Maps Geocoding API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Google Maps Geocoding API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}