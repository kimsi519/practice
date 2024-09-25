// src/components/My.tsx
import React, { useState } from "react";
import Profile from "./Profile";
import Login from "./Login";
import { useSession } from "../context/SessionContext";

const My: React.FC = () => {
  const { session, addCartItem, removeCartItem } = useSession();
  const { loginUser, cart } = session;

  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState<number | "">("");

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      addCartItem(newItemName, Number(newItemPrice));
      setNewItemName("");
      setNewItemPrice("");
    }
  };

  return (
    <div className="my-container">
      {loginUser ? <Profile /> : <Login />}

      <ul className="cart-list">
        {cart.map(({ id, name, price }) => (
          <li key={id} className="cart-item">
            {name} ({price.toLocaleString()}원)
            <button onClick={() => removeCartItem(id)}>DEL</button>
          </li>
        ))}
      </ul>

      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Item Price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(Number(e.target.value))}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default My;
