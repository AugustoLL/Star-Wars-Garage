import React, { useState } from "react";

const AddItemForm: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('vehicle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { name, type };
    const savedItems = JSON.parse(
      localStorage.getItem(
        newItem.type == 'vehicle' ? 'localVehicles' : 'localStarships') || '[]'
      );
    
    localStorage.setItem(
      newItem.type == 'vehicle' ? 'localVehicles' : 'localStarships' , 
      JSON.stringify([...savedItems, newItem])
    );

  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Unnamed Name"
      />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="vehicle">Vehicle</option>
        <option value="starship">Starship</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  )
};

export default AddItemForm;