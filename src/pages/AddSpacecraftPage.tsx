import { useNavigate } from "react-router-dom";
import AddSpacecraftForm from "../components/AddSpacecraftForm";
import "./AddSpacecraftPage.css";

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

/**
 * Page to add a new spacecraft.
 * It renders a form to add a new spacecraft with its common data and specific fields for each type of spacecraft.
 * The user can choose the type of spacecraft to add, Vehicle or Starship, and the form will render the respective specific fields.
 * When the user submits the form, it will create a new Vehicle or Starship object, add the created and edited timestamps and add the new spacecraft to the local storage.
 * The new spacecrafts are stored in the local storage.
 * When the user clicks on the Home button, they will be redirected to the HomePage.
 */
const AddSpacecraftPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <Typography variant="h1" component="h1" className="add-spacecraft-title">
          Add New Spacecraft
        </Typography>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <Button 
          variant="contained"
          className="home-button"
          onClick={handleNavigation}
          startIcon={<HomeIcon/>}
        >
          Home
        </Button>
      </Grid>
      <Grid size={{ xs: 4, sm: 8, md: 12 }}>
        <AddSpacecraftForm />
      </Grid>
    </Grid>
  );
};

export default AddSpacecraftPage;