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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await fetchVehicles();
        const starshipsData = await fetchStarships();

        setVehicles(vehiclesData);
        setStarships(starshipsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

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