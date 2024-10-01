/*Common interface for all starwars vehicles*/
interface Spacecraft {
  type: string;
  favorite: boolean;
  name: string;
  model: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}

interface Vehicle extends Spacecraft {
  vehicle_class: string;
}

interface Starship extends Spacecraft {
  starship_class: string;
  hyperdrive_rating: string;
  MGLT: string;
}

export type { Spacecraft, Vehicle, Starship }