import { useNavigate } from "react-router-dom";
import AddSpacecraftForm from "../components/AddSpacecraftForm";

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
    <div>
      <h1>Add New Spacecraft</h1>
      <button onClick={handleNavigation}>Home</button>
      <AddSpacecraftForm />
    </div>
  );
};

export default AddSpacecraftPage;