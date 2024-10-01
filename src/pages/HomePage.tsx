import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle, Starship } from "../types/starWars";
import { fetchVehicles, fetchStarships } from "../api/swapi";
import "./HomePage.css";

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

        setVehicles([...fetchedVehicles, ...localVehicles]);
        setStarships([...fetchedStarships, ...localStarships]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);


  return (
    <div className="container">
      <h1 className="title">HomePage</h1>
      <button className="button" onClick={handleNavigation}>Add Item</button>
      <ul className="list-container">
        {
          [...vehicles, ...starships]
          .sort((a, b) => {
            return new Date(b.created).getTime() - new Date(a.created).getTime();
          })
          .map((item, index) => (
            <div className={item.favorite ? 'list-item favorite' : 'list-item'} key={index}>
              <div className="list-item-title"> {item.name} </div>
              <div className="list-item-model"> {item.model} </div>
              <div className="list-item-cost"> {item.cost_in_credits} </div>
            </div>
          ))
        }
      </ul>
    </div>
  );
};

export default HomePage;