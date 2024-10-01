import React, { useState } from "react";
import { Vehicle, Starship } from "../types/starWars";
import "./AddSpacecraftForm.css";
import { LOCAL_STORAGE_VEHICLES_KEY, LOCAL_STORAGE_STARSHIPS_KEY } from "../constants";


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';

/**
 * Form to add a new spacecraft to the local storage.
 * The form has two main parts: common data for both Vehicles and Starships and specific fields for each type of spacecraft.
 * The user can choose the type of spacecraft to add, Vehicle or Starship, and the form will render the respective specific fields.
 * When the user submits the form, it will create a new Vehicle or Starship object, add the created and edited timestamps and add the new spacecraft to the local storage.
 */
const AddSpacecraftForm: React.FC = () => {

  /**
   * This is the common data for both Vehicles and Starships.
   * It will be used to create a new Vehicle or Starship object.
   */
  const [commonData, setCommonData] = useState({
    type: 'vehicle',
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

  /**
   * Specific fields for each type of spacecraft.
   * Vehicles needs a vehicle class
   * Starships needs a starship class, a hyperdrive rating and a Megalights/hour
   */
  // Specific fields for Vehicles
  const [vehicleClass, setVehicleClass] = useState('');
  // Specific fields for Starships
  const [starshipClass, setStarshipClass] = useState('');
  const [hyperdriveRating, setHyperdriveRating] = useState('');
  const [MGLT, setMGLT] = useState('');


  /**
   * Handles the form submission.
   * First it prevents the default form submission behavior.
   * Depending on the type of spacecraft being added, it will create a new Vehicle or Starship object
   * by spreading the common data and adding the respective specific fields (vehicle_class, starship_class, hyperdrive_rating, MGLT)
   * and then adding the created and edited timestamps.
   * It will then add the new spacecraft to the local storage, either to the vehicles or starships array.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (commonData.type === 'vehicle') {
      const newVehicle: Vehicle = {
        ...commonData,
        vehicle_class: vehicleClass,
        created: new Date().toISOString(),
        edited: new Date().toISOString(),
      }

      const localVehicles = JSON.parse(localStorage.getItem(LOCAL_STORAGE_VEHICLES_KEY) || '[]');
      localVehicles.push(newVehicle);

      localStorage.setItem(LOCAL_STORAGE_VEHICLES_KEY, JSON.stringify(localVehicles));
    } else if (commonData.type === 'starship') {
      const newStarship: Starship = {
        ...commonData,
        starship_class: starshipClass,
        hyperdrive_rating: hyperdriveRating,
        MGLT: MGLT,
        created: new Date().toISOString(),
        edited: new Date().toISOString(),
      }

      const localStarships = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STARSHIPS_KEY) || '[]');
      localStarships.push(newStarship);

      localStorage.setItem(LOCAL_STORAGE_STARSHIPS_KEY, JSON.stringify(localStarships));
    }

  };

  /**
   * Render the form.
   * Depending on the type of spacecraft being added, it will render extra fields specific for Vehicles or Starships.
   * It will also render the submit button.
   */
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Selector to choose the Type of Spacecraft: Vehicle or Starship*/}
        <select value={commonData.type} onChange={e => setCommonData({...commonData, type: e.target.value})}>
          <option value="vehicle">Vehicle</option>
          <option value="starship">Starship</option>
        </select>
        <FormControlLabel 
          label="Favorite" 
          control={
            <Checkbox
              className="favorite-checkbox"
              icon={<StarBorderOutlinedIcon />} 
              checkedIcon={<StarIcon />}
              checked={commonData.favorite} 
              onChange={e => setCommonData({...commonData, favorite: e.target.checked})}
            />
          } 
        />
      </div>

      {/* Common data for both Vehicles and Starships */}
      <input type="text" name="name" value={commonData.name} onChange={e => setCommonData({...commonData, name: e.target.value})} placeholder="Unnamed Name"/>
      <input type="text" name="model" value={commonData.model} onChange={e => setCommonData({...commonData, model: e.target.value})} placeholder="Model"/>
      <input type="text" name="manufacturer" value={commonData.manufacturer} onChange={e => setCommonData({...commonData, manufacturer: e.target.value})} placeholder="Manufacturer"/>
      <input type="text" name="length" value={commonData.length} onChange={e => setCommonData({...commonData, length: e.target.value})} placeholder="Length"/>
      <input type="text" name="cost_in_credits" value={commonData.cost_in_credits} onChange={e => setCommonData({...commonData, cost_in_credits: e.target.value})} placeholder="Cost in Credits"/>
      <input type="text" name="crew" value={commonData.crew} onChange={e => setCommonData({...commonData, crew: e.target.value})} placeholder="Crew"/>
      <input type="text" name="passengers" value={commonData.passengers} onChange={e => setCommonData({...commonData, passengers: e.target.value})} placeholder="Passengers"/>
      <input type="text" name="max_atmosphering_speed" value={commonData.max_atmosphering_speed} onChange={e => setCommonData({...commonData, max_atmosphering_speed: e.target.value})} placeholder="Max Atmosphering Speed" />
      <input type="text" name="cargo_capacity" value={commonData.cargo_capacity} onChange={e => setCommonData({...commonData, cargo_capacity: e.target.value})} placeholder="Cargo Capacity"/>
      <input type="text" name="consumables" value={commonData.consumables} onChange={e => setCommonData({...commonData, consumables: e.target.value})} placeholder="Consumables"/>

      {/*Multiple fields for Vehicles and Starships (FILMS and PILOTS)*/}


      {/* Specific fields for Vehicles */}
      {commonData.type === 'vehicle' && (
        <input type="text" value={vehicleClass} onChange={e => setVehicleClass(e.target.value)} placeholder="Vehicle Class" />
      )}

      {/* Specific fields for Starships */}
      {commonData.type === 'starship' && (
        <>
          <input type="text" value={starshipClass} onChange={e => setStarshipClass(e.target.value)} placeholder="Starship Class" />
          <input type="text" value={hyperdriveRating} onChange={e => setHyperdriveRating(e.target.value)} placeholder="Hyperdrive Rating" />
          <input type="text" value={MGLT} onChange={e => setMGLT(e.target.value)} placeholder="MGLT (Megalights per hour)" />
        </>
      )}

      <button type="submit" disabled={!commonData.name || !commonData.model || !commonData.manufacturer}>Add Item</button>
    </form>
  )
};

export default AddSpacecraftForm;