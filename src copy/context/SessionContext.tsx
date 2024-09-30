// src/context/SessionContext.tsx
import React, {
  useReducer,
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { Session, CartItem } from "../types";
import { sessionReducer, initialSession } from "../reducer/redducer";

interface SessionContextType {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  addCartItem: (name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, dispatch] = useReducer(sessionReducer, initialSession);

  const login = useCallback((id: number, name: string) => {
    dispatch({ type: "login", payload: { id, name } });
  },[]);;

  const logout =useCallback( () => {
    dispatch({ type: "logout" });
  },[]);

  const addCartItem = useCallback((name: string, price: number) => {
    const newItem: CartItem = {
      id: session.cart.length + 1,
      name,
      price,
    };
    dispatch({ type: "addCartItem", payload: newItem });
  },[session.cart]);

  const removeCartItem = useCallback((itemId: number) => {
    dispatch({ type: "removeCartItem", payload: itemId });
  },[]);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, addCartItem, removeCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};
