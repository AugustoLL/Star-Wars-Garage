import React, { useState } from "react";
import { Vehicle, Starship } from "../types/starWars";
import "./AddSpacecraftForm.css";
import { LOCAL_STORAGE_VEHICLES_KEY, LOCAL_STORAGE_STARSHIPS_KEY } from "../constants";
import FormInput from "./FormInput";
import FormSnackbar from "./FormSnackbar";
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';


import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
// import { Form } from "react-router-dom";

/**
 * Form to add a new spacecraft to the local storage.
 * The form has two main parts: common data for both Vehicles and Starships and specific fields for each type of spacecraft.
 * The user can choose the type of spacecraft to add, Vehicle or Starship, and the form will render the respective specific fields.
 * When the user submits the form, it will create a new Vehicle or Starship object, add the created and edited timestamps and add the new spacecraft to the local storage.
 */
const AddSpacecraftForm: React.FC = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);

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
   * Reset the TextFields to their initial values.
   * This will be called when the user submits the form.
   */
  const resetFields = () => {
    setCommonData({
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
    setVehicleClass('');
    setStarshipClass('');
    setHyperdriveRating('');
    setMGLT('');
  }

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
   * 
   * At the end it will open the snackbar to let the user know that the spacecraft was added,
   * and it will reset the TextFields to their initial values.
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

    setOpenSnackbar(true);
  };

  /**
   * Render the form.
   * Depending on the type of spacecraft being added, it will render extra fields specific for Vehicles or Starships.
   * It will also render the submit button.
   * 
   * It sets up a grid layout.
   */
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {/* Common data for both Vehicles and Starships */}
        <Grid size={{ xs: 4, sm: 8, md: 8 }}>
          {/* Selector to choose the Type of Spacecraft: Vehicle or Starship*/}
          <FormInput 
            type="select"
            label="Type of Spacecraft" 
            name="type" 
            value={commonData.type} 
            onChange={e => setCommonData({...commonData, type: e.target.value})} 
            required={true} 
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 8, md: 4 }}>
          {/* Checkbox to mark the spacecraft as favorite*/}
          {/* <FormInput
            type="checkbox"
            label="Favorite" 
            name="favorite"
            isChecked={commonData.favorite}
            onChange={e => setCommonData({...commonData, favorite: e.target.checked})}
          /> */}
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
        </Grid>
        <Grid size={{ xs: 4, sm: 6, md: 8 }}>
          <FormInput label="Name of the spacecraft" name="name" value={commonData.name} onChange={e => setCommonData({...commonData, name: e.target.value})} required={true}/>
        </Grid>
        <Grid size={{ xs: 4, sm: 2, md: 4 }}>
          <FormInput label="Model" name="model" value={commonData.model} onChange={e => setCommonData({...commonData, model: e.target.value})} required={true} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <FormInput label="Manufacturer" name="manufacturer" value={commonData.manufacturer} onChange={e => setCommonData({...commonData, manufacturer: e.target.value})} required={true} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <FormInput label="Length" name="length" value={commonData.length} onChange={e => setCommonData({...commonData, length: e.target.value})} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <FormInput label="Cost in Credits" name="cost_in_credits" value={commonData.cost_in_credits} onChange={e => setCommonData({...commonData, cost_in_credits: e.target.value})} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 6 }}>
          <FormInput label="Crew" name="crew" value={commonData.crew} onChange={e => setCommonData({...commonData, crew: e.target.value})} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 6 }}>
          <FormInput label="Passengers" name="passengers" value={commonData.passengers} onChange={e => setCommonData({...commonData, passengers: e.target.value})} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <FormInput label="Max Atmosphering Speed" name="max_atmosphering_speed" value={commonData.max_atmosphering_speed} onChange={e => setCommonData({...commonData, max_atmosphering_speed: e.target.value})} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <FormInput label="Cargo Capacity" name="cargo_capacity" value={commonData.cargo_capacity} onChange={e => setCommonData({...commonData, cargo_capacity: e.target.value})} />
        </Grid>
        <Grid size={{ xs: 4, sm: 4, md: 4 }}>
          <FormInput label="Consumables" name="consumables" value={commonData.consumables} onChange={e => setCommonData({...commonData, consumables: e.target.value})} />
        </Grid>
        {/* Specific fields for Vehicles */}
        {commonData.type === 'vehicle' && (
          <Grid size={{ xs: 4, sm: 8, md: 12 }}>
            <FormInput label="Vehicle Class" name="vehicle_class" value={vehicleClass} onChange={e => setVehicleClass(e.target.value)} required={true} />
          </Grid>
        )}
        {/* Specific fields for Starships */}
        {commonData.type === 'starship' && (
          <>
            <Grid size={{ xs: 4, sm: 8, md: 4 }}>
              <FormInput label="Starship Class" name="starship_class" value={starshipClass} onChange={e => setStarshipClass(e.target.value)} required={true} />
            </Grid>
            <Grid size={{ xs: 4, sm: 4, md: 4 }}>
              <FormInput label="Hyperdrive Rating" name="hyperdrive_rating" value={hyperdriveRating} onChange={e => setHyperdriveRating(e.target.value)} required={true} />
            </Grid>
            <Grid size={{ xs: 4, sm: 4, md: 4 }}>
              <FormInput label="MGLT (Megalights per hour)" name="MGLT" value={MGLT} onChange={e => setMGLT(e.target.value)} required={true} />
            </Grid>
          </>
        )}
        {/* Submit button */}
        <Grid size={{ xs: 4, sm: 8, md: 12 }}>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            className="submit-button"
          >
            Add {commonData.type}
          </Button>
        </Grid>
      </Grid>
      {/* Snackbar */}
      <FormSnackbar 
        isOpen={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false)
          resetFields();
        }}
        message={`Succesfully added "${commonData.name}" as a new ${commonData.type}`}
      />
    </form>
  )
};

export default AddSpacecraftForm;