import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3';
export interface Ingredient extends SimulationNodeDatum {
  name: string;
  description: string;
  volume: string;
  weight: string;
}

export interface Pairing extends SimulationLinkDatum<Ingredient> {
  source: string;
  target: string;
}
