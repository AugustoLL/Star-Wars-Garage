import React from "react";
import { useNavigate } from "react-router-dom";
import AddSpacecraftForm from "../components/AddSpacecraftForm";

const AddSpacecraftPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  }
  return (
    <div>
      <h1>Add New Spacecraft</h1>
      <button onClick={handleNavigation}>Go Home</button>
      <AddSpacecraftForm />
    </div>
  );
};

export default AddSpacecraftPage;