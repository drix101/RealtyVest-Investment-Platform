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
    const { zpid } = req.query;
    const zillowApiKey = process.env.VITE_ZILLOW_API_KEY;
    
    if (!zillowApiKey || zillowApiKey === 'your_zillow_api_key_here') {
      return res.status(400).json({ error: 'Zillow API key not configured' });
    }
    
    // Make the request to Zillow API
    const response = await fetch(`https://api.zillow.com/webservice/GetZestimate.htm?zws-id=${zillowApiKey}&zpid=${zpid}`);
    
    if (!response.ok) {
      throw new Error(`Zillow API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Zillow API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}