export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const DATAGOLF_API_KEY = '056c1ba85bc2baccaf576c1c8385';
    const url = `https://feeds.datagolf.com/preds/live-tournament-stats?tour=pga&file_format=json&key=${DATAGOLF_API_KEY}`;

    console.log('Fetching from DataGolf:', url);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`DataGolf API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('DataGolf data received:', data);

    // Return the data
    res.status(200).json(data);

  } catch (error) {
    console.error('Error in scores API:', error);
    res.status(500).json({ 
      error: 'Failed to fetch scores',
      message: error.message 
    });
  }
}
