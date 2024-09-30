import { Vehicle, Starship } from '../types/starWars';

const fetchAllItems = async <Spacecraft>(initialUrl: string): Promise<Spacecraft[]> => {
  let allItems: Spacecraft[] = [];
  let url = initialUrl;

  while (url) {
    const response = await fetch(url);
    const data = await response.json();

    allItems = [...allItems, ...data.results];

    url = data.next;
  }
  
  return allItems;
}

export const fetchVehicles = async () => {
  const response = await fetchAllItems<Vehicle>('https://swapi.dev/api/vehicles/');
  return response;
};

export const fetchStarships = async () => {
  const response = await fetchAllItems<Starship>('https://swapi.dev/api/starships/');
  return response;
};