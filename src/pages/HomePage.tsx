import React, { useState, useEffect } from "react";
import { Vehicle, Starship } from "../types/starWars";

const HomePage: React.FC = () => {

  type Item = Vehicle | Starship;

  const [items, setItems] = useState<Item[]>([]);

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
      <div>HomePage</div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;