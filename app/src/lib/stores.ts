import type { Ingredient, Pairing } from '$lib/types';
import { writable, derived } from 'svelte/store';
import { getIngredient, getPairings } from '$lib/util';

export const ingredients = writable<Ingredient[]>([]);
ingredients.subscribe((data) => console.log(data));

export const pairings = writable<Pairing[]>([]);
pairings.subscribe((data) => console.log(data));
