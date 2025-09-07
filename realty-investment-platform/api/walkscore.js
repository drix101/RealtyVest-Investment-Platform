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
    const { address, lat, lon } = req.query;
    const walkScoreApiKey = process.env.VITE_WALKSCORE_API_KEY;
    
    if (!walkScoreApiKey || walkScoreApiKey === 'your_walkscore_api_key_here') {
      return res.status(400).json({ error: 'WalkScore API key not configured' });
    }
    
    // Make the request to WalkScore API
    const response = await fetch(`https://api.walkscore.com/score?format=json&address=${encodeURIComponent(address)}&lat=${lat}&lon=${lon}&wsapikey=${walkScoreApiKey}`);
    
    if (!response.ok) {
      throw new Error(`WalkScore API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('WalkScore API proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}