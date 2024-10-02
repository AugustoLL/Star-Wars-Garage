import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Vehicle, Starship } from "../types/starWars";
import { fetchVehicles, fetchStarships } from "../api/swapi";
import "./HomePage.css";
import { LOCAL_STORAGE_STARSHIPS_KEY, LOCAL_STORAGE_VEHICLES_KEY, FAVORITE_SPACECRAFTS } from "../constants";
import SpacecraftCard from "../components/SpacecraftCard";
import FilterChips from "../components/FilterChips";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

/**
 * HomePage component
 * This is the main page of the application
 * It displays a list of spacecrafts, including vehicles and starships
 * The list is sorted by the time it was created and the items that are favorites are marked and moved to the top
 * There is also a button to navigate to the AddSpacecraftPage to add new spacecrafts
 * The data is fetched from the SWAPI and from the local storage
 * If the data is not available in the local storage, it is fetched from the SWAPI
 * If the data is not available in the SWAPI, it is not displayed
 * The favorites are stored in the local storage
 */
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

  /**
   * Initialize state for filter as "all"
   * and provide setFilter as a function to update its state.
   * Used to filter the items shown in the homepage.
   * Can be "all", "vehicles" or "starships".
   */
  const [filter, setFilter] = useState<string>("all"); 

  /**
   * Used to load data from local storage and merge it with the data from the SWAPI.
   */
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
     * then merge the vehicles from the api with the ones from local storage,
     * and set the type variable to vehicles.
     * then merge the starships from the api with the ones from local storage,
     * and set the type variable to starships.
     * */
    const fetchData = async () => {
      try {
        const fetchedVehicles = await fetchVehicles();
        const fetchedStarships = await fetchStarships();

        const localVehicles = loadFromLocalStorage(LOCAL_STORAGE_VEHICLES_KEY);
        const localStarships = loadFromLocalStorage(LOCAL_STORAGE_STARSHIPS_KEY);

        setVehicles([...fetchedVehicles, ...localVehicles].map(vehicle => ({...vehicle, type: "vehicle"})));
        setStarships([...fetchedStarships, ...localStarships].map(starship => ({...starship, type: "starship"})));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, []);

  const filterSpacecrafts = () => {
    if (filter === "vehicles") {
      return vehicles;
    } else if (filter === "starships") {
      return starships;
    } else {
      return [...vehicles, ...starships];
    }
  }

  /** 
   * If a spacecraft's name is in the list of favorites, 
   * mark it as favorite by setting the favorite parameter to true
   * */
  const markFavorites = (items: Spacecraft[]) => {
    return items.map((item) => ({
      ...item,
      favorite: item.favorite ? true : FAVORITE_SPACECRAFTS.includes(item.name),
    }));
  };

  /** 
   * Sort vehicles and starships
   * First if an item is favorite, then move it to the top
   * Then sort y the time it was created
   * This function is used to show the spacecrafts in the <ul>
   * */
  const sortedSpacecrafts = markFavorites(filterSpacecrafts()).sort((a, b) => {
    const aIsFavorite = FAVORITE_SPACECRAFTS.includes(a.name);
    const bIsFavorite = FAVORITE_SPACECRAFTS.includes(b.name);

    if (aIsFavorite && !bIsFavorite) return -1;
    else if (!aIsFavorite && bIsFavorite) return 1;

    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });


  /**
   * Render the <ul> with the sorted spacecrafts,
   * and the Add Spacecraft button used to navigate to the AddSpacecraftPage.
   */
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <h1 className="title">Star Wars Garage</h1>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleNavigation}
          startIcon={<AddIcon /> }
        >
          Add Spacecraft
        </Button>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <Container fixed>
          <FilterChips
            currentValue = { filter }
            chips={[
              { label: "All", onClick: () => setFilter("all"), },
              { label: "Vehicles", onClick: () => setFilter("vehicles") },
              { label: "Starships", onClick: () => setFilter("starships") },
            ]}
          />
        </Container>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <Container fixed>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {sortedSpacecrafts.map((item, index) => (
              <Grid size={{ xs: 4, sm: 4, md: 4 }} key={index}>
                <SpacecraftCard spacecraft={item} />
              </Grid>
            ))}
            <Grid size={{ xs: 4, sm: 4, md: 4 }}></Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default HomePage;