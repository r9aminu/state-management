import React, { useState } from 'react';
import { useImmer } from 'use-immer';

// Manages a list of shopping items
const ShoppingListWithImmer = () => {
  const [shoppingList, updateShoppingList] = useImmer([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [editableItem, editItem] = useState(null);

  // Add item to list
  const addItem = (e) => {
    e.preventDefault();
    updateShoppingList(draft => {
      draft.push({ id, name, quantity, details: { category, notes } });
    });

    // Clear the inputs
    setId('');
    setName('');
    setQuantity('');
    setCategory('');
    setNotes('');
  };

  // Remove item by ID
  const removeItem = (e) => {
    e.preventDefault();
    updateShoppingList(draft => draft.filter(item => item.id !== id));
    setId('');
  };

  // Load item for editing
  const fetchItem = (e) => {
    e.preventDefault();
    const item = shoppingList.find(item => item.id === updateId);
    if (item) {
      setId(item.id);
      setName(item.name);
      setQuantity(item.quantity);
      setCategory(item.details.category);
      setNotes(item.details.notes);
      editItem(item.id);
    }
  };

  // Save edited item
  const updateItem = (e) => {
    e.preventDefault();
    updateShoppingList(draft => {
      const item = draft.find(item => item.id === editableItem);
      if (item) {
        item.name = name;
        item.quantity = quantity;
        item.details.category = category;
        item.details.notes = notes;
      }
    });
    editItem(null);
    setId('');
    setName('');
    setQuantity('');
    setCategory('');
    setNotes('');
  };

  return (
    <div>
      <h2>My Shopping List</h2>
      <form onSubmit={addItem}>  {/* Form to add new items */}

        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
      <form onSubmit={removeItem}> {/* Form to remove items */}
        <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <button type="submit">Remove</button>
      </form>
      <form onSubmit={fetchItem}>
        <input placeholder="ID" value={updateId} onChange={(e) => setUpdateId(e.target.value)} />
        <button type="submit">Update</button>
      </form>
      {editableItem && (
        <div>
          <h3>Edit Item ID: {editableItem}</h3>
          <form onSubmit={updateItem}>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button type="submit">Save Item</button>
          </form>
        </div>
      )}
      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>
            ID: {item.id}, Name: {item.name}, Quantity: {item.quantity},
            Category: {item.details.category}, Notes: {item.details.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListWithImmer;
