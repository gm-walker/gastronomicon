export async function getIngredient(ingredients: string) {
  try {
    let response = await fetch(`/api/ingredients?name=${encodeURIComponent(ingredients)}`);
    if (!response.ok) {
      console.warn(`API returned ${response.status} for ingredients`);
      return [];
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch ingredients:', error);
    return [];
  }
}

export async function getPairings(ingredients: string) {
  try {
    let response = await fetch(`/api/pairings?name=${encodeURIComponent(ingredients)}`);
    if (!response.ok) {
      console.warn(`API returned ${response.status} for pairings`);
      return [];
    }
    let result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch pairings:', error);
    return [];
  }
}
