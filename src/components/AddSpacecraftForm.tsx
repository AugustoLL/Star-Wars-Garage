import React, { useState } from "react";
import { Vehicle, Starship } from "../types/starWars";

const AddSpacecraftForm: React.FC = () => {

  const [spacecraftType, setSpacecraftType] = useState('vehicle');

  // Common data for both Vehicles and Starships
  const [commonData, setCommonData] = useState({
    favorite: false,
    name: '',
    model: '',
    manufacturer: '',
    length: '',
    cost_in_credits: '',
    crew: '',
    passengers: '',
    max_atmosphering_speed: '',
    cargo_capacity: '',
    consumables: '',
    films: [],
    pilots: [],
    url: '',
  });

  // Specific fields for Vehicles
  const [vehicleClass, setVehicleClass] = useState('');
  // Specific fields for Starships
  const [starshipClass, setStarshipClass] = useState('');
  const [hyperdriveRating, setHyperdriveRating] = useState('');
  const [MGLT, setMGLT] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (spacecraftType === 'vehicle') {
      const newVehicle: Vehicle = {
        ...commonData,
        vehicle_class: vehicleClass,
        created: new Date().toISOString(),
        edited: new Date().toISOString(),
      }

      const localVehicles = JSON.parse(localStorage.getItem('localVehicles') || '[]');
      localVehicles.push(newVehicle);

      localStorage.setItem('localVehicles', JSON.stringify(localVehicles));
    } else if (spacecraftType === 'starship') {
      const newStarship: Starship = {
        ...commonData,
        starship_class: starshipClass,
        hyperdrive_rating: hyperdriveRating,
        MGLT: MGLT,
        created: new Date().toISOString(),
        edited: new Date().toISOString(),
      }

      const localStarships = JSON.parse(localStorage.getItem('localStarships') || '[]');
      localStarships.push(newStarship);

      localStorage.setItem('localStarships', JSON.stringify(localStarships));
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Selector to choose the Type of Spacecraft: Vehicle or Starship*/}
      <select value={spacecraftType} onChange={e => setSpacecraftType(e.target.value)}>
        <option value="vehicle">Vehicle</option>
        <option value="starship">Starship</option>
      </select>

      {/* Common data for both Vehicles and Starships */}
      <input type="text" name="name" value={commonData.name} onChange={e => setCommonData({...commonData, name: e.target.value})} placeholder="Unnamed Name"/>

      {/* Specific fields for Vehicles */}
      {spacecraftType === 'vehicle' && (
        <input type="text" value={vehicleClass} onChange={e => setVehicleClass(e.target.value)} placeholder="Vehicle Class" />
      )}

      {/* Specific fields for Starships */}
      {spacecraftType === 'starship' && (
        <>
          <input type="text" value={starshipClass} onChange={e => setStarshipClass(e.target.value)} placeholder="Starship Class" />
          <input type="text" value={hyperdriveRating} onChange={e => setHyperdriveRating(e.target.value)} placeholder="Hyperdrive Rating" />
          <input type="text" value={MGLT} onChange={e => setMGLT(e.target.value)} placeholder="MGLT (Megalights per hour)" />
        </>
      )}

      <button type="submit">Add Item</button>
    </form>
  )
};

export default AddSpacecraftForm;