export async function getIngredient(ingredients: string) {
  let response = await fetch(`/api/ingredients?name=${encodeURIComponent(ingredients)}`);
  let result = await response.json();
  return result;
}

export async function getPairings(ingredients: string) {
  let response = await fetch(`/api/pairings?name=${encodeURIComponent(ingredients)}`);
  let result = await response.json();
  return result;
}
