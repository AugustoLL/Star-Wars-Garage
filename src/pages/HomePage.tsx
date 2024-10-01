import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle, Starship } from "../types/starWars";
import { fetchVehicles, fetchStarships } from "../api/swapi";
import "./HomePage.css";

const HomePage: React.FC = () => {

  /**
   * Navigate to the AddSpacecraftPage when the Add Spacecraft button is clicked
   * This is used by the button Add Item
   * */
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/add');
  }

  type Spacecraft = Vehicle | Starship;

  /** 
   * Initialize state for vehicles and starships as empty arrays of Spacecraft objects
   * and provide setVehicles and setStarships as functions to update their state
   * */
  const [vehicles, setVehicles] = useState<Spacecraft[]>([]);
  const [starships, setStarships] = useState<Spacecraft[]>([]);

  const LOCAL_STORAGE_VEHICLES_KEY = 'localVehicles';
  const LOCAL_STORAGE_STARSHIPS_KEY = 'localStarships';
  const favoriteSpacecrafts = ["Millennium Falcon", "X-wing"];

  useEffect(() => {

    /** 
     * Load data from local storage based on a given key,
     * if the key is "localVehicles" or "localStarships",
     * parse the data and return it as an array of Vehicles or Starships,
     * otherwise return an empty array
     * */
    const loadFromLocalStorage = (key: string): Spacecraft[] => {
      const storedItems = localStorage.getItem(key);
      if (key === LOCAL_STORAGE_VEHICLES_KEY) {
        return storedItems ? JSON.parse(storedItems) as Vehicle[] : [];  
      } else if (key === LOCAL_STORAGE_STARSHIPS_KEY) {
        return storedItems ? JSON.parse(storedItems) as Starship[] : [];
      } else return []
    }

    /** 
     * Fetch the vehicles and the starships from the SWAPI,
     * then load the data from local storage if it exists,
     * then merge the vehicles from the api with the ones from local storage
     * then merge the starships from the api with the ones from local storage
     * */
    const fetchData = async () => {
      try {
        const fetchedVehicles = await fetchVehicles();
        const fetchedStarships = await fetchStarships();

        const localVehicles = loadFromLocalStorage(LOCAL_STORAGE_VEHICLES_KEY);
        const localStarships = loadFromLocalStorage(LOCAL_STORAGE_STARSHIPS_KEY);

        setVehicles([...fetchedVehicles, ...localVehicles]);
        setStarships([...fetchedStarships, ...localStarships]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  /** 
   * If a spacecraft's name is in the list of favorites, 
   * mark it as favorite by setting the favorite parameter to true
   * */
  const markFavorites = (items: Spacecraft[]) => {
    return items.map((item) => ({
      ...item,
      favorite: favoriteSpacecrafts.includes(item.name),
    }));
  };

  /** 
   * Sort vehicles and starships
   * First if an item is favorite, then move it to the top
   * Then sort y the time it was created
   * This function is used to show the spacecrafts in the <ul>
   * */
  const sortedSpacecrafts = markFavorites([...vehicles, ...starships]).sort((a, b) => {
    const aIsFavorite = favoriteSpacecrafts.includes(a.name);
    const bIsFavorite = favoriteSpacecrafts.includes(b.name);

    if (aIsFavorite && !bIsFavorite) return -1;
    else if (!aIsFavorite && bIsFavorite) return 1;

    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });


  return (
    <div className="container">
      <h1 className="title">HomePage</h1>
      <button className="button" onClick={handleNavigation}>Add Item</button>
      <ul className="list-container">
        {
          sortedSpacecrafts.map((item, index) => (
            /** 
             * if an item is favorite, add the class "favorite" to it and a little star next to the name 
             * else only add the class "list-item"
             * also formats the timestamp to be in the format "dd/mm/yyyy"
             * */
            <div className={item.favorite ? 'list-item favorite' : 'list-item'} key={index}>
              <div className="list-item-title"> {item.name} {item.favorite && <strong>(★)</strong>} </div>
              <div className="list-item-model"> {item.model} </div>
              <div className="list-item-cost"> {item.cost_in_credits} </div>
              <div className="list-item-created"> {new Date(item.created).toLocaleDateString("en-GB")} </div>
            </div>
          ))
        }
      </ul>
    </div>
  );
};

export default HomePage;