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

  // 수정 중인 아이템의 상태
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState<number | "">("");
  const [hasDirty, setHasDirty] = useState(false); // 값이 변경되었는지 여부

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      addCartItem(newItemName, Number(newItemPrice));
      setNewItemName("");
      setNewItemPrice("");
    }
  };

  // 아이템 수정 핸들러 (수정 버튼을 클릭했을 때)
  const handleEditItem = (itemId: number, name: string, price: number) => {
    setEditingItemId(itemId); // 수정할 아이템의 ID 저장
    setEditedName(name); // 현재 이름과 가격을 편집 상태로 설정
    setEditedPrice(price);
  };

  // 아이템 업데이트 핸들러 (수정한 값을 저장할 때)
  const handleUpdateItem = () => {
    if (editingItemId !== null) {
      const updatedCart = cart.map((item) =>
        item.id === editingItemId
          ? { ...item, name: editedName, price: Number(editedPrice) } // 아이템을 업데이트
          : item
      );
      session.cart = updatedCart; // 상태 업데이트
      setEditingItemId(null); // 수정 모드를 해제
      setHasDirty(false); // 저장 후 hasDirty 해제
    }
  };

  // 취소 핸들러 (수정을 취소할 때)
  const handleCancelEdit = () => {
    setEditingItemId(null); // 수정 모드를 해제
    setEditedName(""); // 수정 값을 초기화
    setEditedPrice("");
    setHasDirty(false); // hasDirty 해제
  };

  // 값 변경 시 hasDirty 처리
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<any>>,
    value: any
  ) => {
    setter(value);
    setHasDirty(true);
  };

  return (
    <div className="my-container">
      {loginUser ? <Profile /> : <Login />}

      <ul className="cart-list">
        {cart.map(({ id, name, price }) => (
          <li key={id} className="cart-item">
            {editingItemId === id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) =>
                    handleInputChange(setEditedName, e.target.value)
                  }
                />
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) =>
                    handleInputChange(setEditedPrice, e.target.value)
                  }
                />
                {hasDirty && (
                  <button onClick={handleUpdateItem}>Save</button> // hasDirty가 true일 때만 버튼 보임
                )}
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {name} ({price.toLocaleString()}원)
                <button onClick={() => handleEditItem(id, name, price)}>
                  Edit
                </button>
                <button onClick={() => removeCartItem(id)}>DEL</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="add-item-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => handleInputChange(setNewItemName, e.target.value)}
        />
        <input
          type="number"
          placeholder="Item Price"
          value={newItemPrice}
          onChange={(e) => handleInputChange(setNewItemPrice, e.target.value)}
        />
        {hasDirty && (
          <button onClick={handleAddItem}>Add Item</button> // hasDirty가 true일 때만 버튼 보임
        )}
      </div>
    </div>
  );
};

export default My;
