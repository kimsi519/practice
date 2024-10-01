// src/components/Item.tsx
import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { ItemContextType } from "./ItemLayout";
import { CartItem } from "../types";
import { useSession } from "../context/SessionContext";

const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const itemFromState = location.state?.item as CartItem | undefined;
  const { session, updateCartItem } = useSession();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const context = useOutletContext<ItemContextType>(); // context 가져오기

  useEffect(() => {
    if (id) {
      let foundItem = session.cart.find((item) => item.id === Number(id));
      if (!foundItem && itemFromState) {
        foundItem = itemFromState;
      }
      if (foundItem) {
        setEditingItem(foundItem);
      } else {
        navigate("/items"); // 아이템이 없으면 목록으로 리다이렉트
      }
    }
  }, [session.cart, id, navigate, itemFromState]);

  return (
    <div>
      {editingItem ? (
        <>
          <h2>{editingItem.name}</h2>
          <p>Price: {editingItem.price}원</p>
          <div>
            <label>Item Name:</label>
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
            />
          </div>
          <div>
            <label>Item Price:</label>
            <input
              type="number"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  price: Number(e.target.value),
                })
              }
            />
          </div>
          <button>Save</button>
        </>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
};

export default Item;
