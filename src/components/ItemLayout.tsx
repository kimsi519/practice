import React, { useState, createContext, useMemo } from "react";
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
  };

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
        </div>

        {/* 오른쪽에 선택된 아이템 상세 정보만 표시 */}
        <div style={{ flex: 2, marginLeft: 30 }}>
          <Outlet />
        </div>
      </div>
    </ItemContext.Provider>
  );
};

export default ItemLayout;
