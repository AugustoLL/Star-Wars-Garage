export const fetchVehicles = async () => {
  const response = await fetch('https://swapi.dev/api/vehicles/');
  return response.json();
};

export const fetchStarships = async () => {
  const response = await fetch('https://swapi.dev/api/starships/');
  return response.json();
};