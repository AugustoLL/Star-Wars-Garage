import React from "react";
import { useNavigate } from "react-router-dom";
import AddItemForm from "../components/AddItemForm";

const AddItemPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  }
  return (
    <div>
      <h1>Add New Spacecraft</h1>
      <button onClick={handleNavigation}>Go Home</button>
      <AddItemForm />
    </div>
  );
};

export default AddItemPage;