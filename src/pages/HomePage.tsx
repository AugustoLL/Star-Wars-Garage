import React, { useState, useEffect } from "react";

const HomePage: React.FC = () => {

  interface Vehicle {
    name: string;
    model: string;
    vehicle_class: string;
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

  interface Starship {
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
  }

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