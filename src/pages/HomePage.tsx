import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle, Starship } from "../types/starWars";

const HomePage: React.FC = () => {

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/add');
  }

  type Spacecraft = Vehicle | Starship;

  const [items, setItems] = useState<Spacecraft[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesResponse = await fetch('https://swapi.dev/api/vehicles/');
        const starshipResponse = await fetch('https://swapi.dev/api/starships/');
        const vehicles = await vehiclesResponse.json();
        const starships = await starshipResponse.json();
        setItems([...vehicles.results, ...starships.results]);
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
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;