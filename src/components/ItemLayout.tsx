import React, { useState, createContext, useMemo, useEffect } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { CartItem } from "../types";

export interface ItemContextType {
  selectedItem: CartItem | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<CartItem | null>>;
}

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined
);

const ItemLayout: React.FC = () => {
  const { session, addCartItem } = useSession();
  const { cart } = session;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const filteredItems = useMemo(
    () =>
      cart.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [cart, searchTerm]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchParams({ search: e.target.value });
    console.log(searchParams);
  };

  const handleAddItem = () => {
    const newItemName = `New Item ${cart.length + 1}`;
    const newItemPrice = 1000 + cart.length * 100;
    addCartItem(newItemName, newItemPrice);
    const newItem: CartItem = {
      id: cart.length + 1,
      name: newItemName,
      price: newItemPrice,
    };
    setSelectedItem(newItem);
    navigate(`/items/${newItem.id}`, { state: { item: newItem } });
  };

  useEffect(() => {
    if (filteredItems.length > 0) {
      const firstItem = filteredItems[0];
      setSelectedItem(firstItem);

      // 현재 URL이 첫 번째 아이템의 상세 페이지가 아니면 네비게이션 수행
      if (location.pathname !== `/items/${firstItem.id}`) {
        navigate(`/items/${firstItem.id}`, { state: { item: firstItem } });
      }
    } else {
      setSelectedItem(null);
      // 아이템이 없으면 아이템 목록 페이지로 이동
      if (location.pathname !== "/items") {
        navigate("/items");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <ItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2>Items List</h2>
          <input
            type="text"
            placeholder="Search items"
            value={searchTerm}
            onChange={handleSearch}
          />
          <ul>
            {filteredItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/items/${item.id}`}
                  state={{ item }}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    fontWeight:
                      selectedItem?.id === item.id ? "bold" : "normal",
                  }}
                >
                  {item.name} - {item.price}원
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={handleAddItem}>Add Item</button>
        </div>

        {/* 오른쪽에 선택된 아이템 상세 정보만 표시 */}
        <div style={{ flex: 1, marginLeft: 30 }}>
          <Outlet />
        </div>
      </div>
    </ItemContext.Provider>
  );
};

export default ItemLayout;
