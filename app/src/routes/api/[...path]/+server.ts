import { API_PATH } from '$env/static/private';

// Mock/fallback data
const mockIngredients = [
  {
    name: 'salt',
    description: 'Sodium chloride seasoning',
    volume: '10 ml',
    weight: '10 g'
  },
  {
    name: 'pepper',
    description: 'Black pepper seasoning',
    volume: '5 ml',
    weight: '5 g'
  },
  {
    name: 'olive oil',
    description: 'Extra virgin olive oil',
    volume: '30 ml',
    weight: '27 g'
  }
];

const mockPairings = [
  { source: 'salt', target: 'pepper' },
  { source: 'salt', target: 'olive oil' },
  { source: 'pepper', target: 'olive oil' }
];

function getLocalData(path: string, query: string) {
  const searchParams = new URLSearchParams(query.substring(1)); // Remove leading '?'

  if (path === 'ingredients') {
    const name = searchParams.get('name');
    if (name) {
      return mockIngredients.filter(ing =>
        ing.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    return mockIngredients;
  }

  if (path === 'pairings') {
    const name = searchParams.get('name');
    if (name) {
      return mockPairings.filter(
        pair =>
          pair.source.toLowerCase().includes(name.toLowerCase()) ||
          pair.target.toLowerCase().includes(name.toLowerCase())
      );
    }
    return mockPairings;
  }

  return [];
}

export async function GET({ params, url, fetch }) {
  const path = params.path;
  const query = url.search;

  try {
    const response = await fetch(`${API_PATH}/${path}${query}`);
    
    if (!response.ok) {
      console.warn(`API returned ${response.status}, falling back to local data`);
      const localData = getLocalData(path, query);
      return new Response(JSON.stringify(localData), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.warn('API fetch failed, falling back to local data:', error);
    const localData = getLocalData(path, query);
    return new Response(JSON.stringify(localData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
