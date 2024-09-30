import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle, Starship } from "../types/starWars";
import { fetchVehicles, fetchStarships } from "../api/swapi";

const HomePage: React.FC = () => {

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/add');
  }

  type Spacecraft = Vehicle | Starship;

  const [vehicles, setVehicles] = useState<Spacecraft[]>([]);
  const [starships, setStarships] = useState<Spacecraft[]>([]);

  const LOCAL_STORAGE_VEHICLES_KEY = 'localVehicles';
  const LOCAL_STORAGE_STARSHIPS_KEY = 'localStarships';

  useEffect(() => {

    const loadFromLocalStorage = (key: string): Spacecraft[] => {
      const storedItems = localStorage.getItem(key);
      if (key === LOCAL_STORAGE_VEHICLES_KEY) {
        return storedItems ? JSON.parse(storedItems) as Vehicle[] : [];  
      } else {
        return storedItems ? JSON.parse(storedItems) as Starship[] : [];
      }
      
    }

    const fetchData = async () => {
      try {
        const fetchedVehicles = await fetchVehicles();
        const fetchedStarships = await fetchStarships();

        const localVehicles = loadFromLocalStorage(LOCAL_STORAGE_VEHICLES_KEY);
        const localStarships = loadFromLocalStorage(LOCAL_STORAGE_STARSHIPS_KEY);

        console.log(localVehicles);
        console.log(localStarships);
        

        setVehicles([...fetchedVehicles, ...localVehicles]);
        setStarships([...fetchedStarships, ...localStarships]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    console.table(vehicles);

    fetchData();

  }, []);


  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={handleNavigation}>Add Item</button>
      <ul>
        {[...vehicles, ...starships].map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;