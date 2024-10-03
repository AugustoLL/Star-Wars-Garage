import { Vehicle, Starship, Film } from '../types/starWars';
import { API_URL } from '../constants';


/**
 * Fetches all items from the given URL, by following the "next" pagination links.
 * The initial URL is passed as a parameter and then it is updated with the "next" url if it exists.
 */
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

/**
 * Fetches a film by id from the SWAPI.
 */
export const fetchFilmById = async (id: string): Promise<Film> => {
  const response = await fetch(`${API_URL}films/${id}`);
  const data = await response.json();
  return data;
}

/**
 * Fetches all films from the SWAPI.
 * It recieves the entire url as a parameter (like: http https://swapi.dev/api/films/1/)
 * because the "film" attribute in vehicles and starships doesn't contain an id,
 * but the entire url.
 */
export const fetchFilmByUrl = async (url: string): Promise<Film> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/**
 * Fetches all vehicles from the SWAPI.
 */
export const fetchVehicles = async () => {
  const response = await fetchAllItems<Vehicle>(`${API_URL}vehicles/`);
  return response;
};

/**
 * Fetches all starships from the SWAPI.
 */
export const fetchStarships = async () => {
  const response = await fetchAllItems<Starship>(`${API_URL}starships/`);
  return response;
};