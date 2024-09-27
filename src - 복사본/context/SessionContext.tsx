// src/context/SessionContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { sessionReducer, initialSession } from "../reducer/sessionReducer";
import { Session, CartItem } from "../types";

interface SessionContextType {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  addCartItem: (name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
}

// Context 생성
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Custom Hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

// Provider 생성
export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, dispatch] = useReducer(sessionReducer, initialSession);

  // Action 함수들 정의
  const login = (id: number, name: string) => {
    dispatch({ type: "login", payload: { id, name } });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  const addCartItem = (name: string, price: number) => {
    const newItem: CartItem = {
      id: session.cart.length + 1,
      name,
      price,
    };
    dispatch({ type: "addCartItem", payload: newItem });
  };

  const removeCartItem = (itemId: number) => {
    dispatch({ type: "removeCartItem", payload: itemId });
  };

  return (
    <SessionContext.Provider
      value={{ session, login, logout, addCartItem, removeCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};
