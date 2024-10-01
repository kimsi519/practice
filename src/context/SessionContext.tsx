// src/context/SessionContext.tsx
import React, {
  useReducer,
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { Session, CartItem } from "../types";
import { sessionReducer, initialSession } from "../reducer/redducer";

interface SessionContextType {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  addCartItem: (name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
  updateCartItem: (updatedItem: CartItem) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

// 브라우저 저장소에서 초기값 불러오기
const loadInitialSession = (): Session => {
  const loginUserData = sessionStorage.getItem("loginUser");
  const cartData = localStorage.getItem("cart");

  return {
    loginUser: loginUserData ? JSON.parse(loginUserData) : null,
    cart: cartData
      ? JSON.parse(cartData)
      : [
          { id: 100, name: "라면", price: 3000 },
          { id: 101, name: "컵라면", price: 2000 },
          { id: 200, name: "파", price: 5000 },
        ],
  };
};

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, dispatch] = useReducer(
    sessionReducer,
    initialSession,
    loadInitialSession
  );

  // loginUser가 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    if (session.loginUser) {
      sessionStorage.setItem("loginUser", JSON.stringify(session.loginUser));
    } else {
      sessionStorage.removeItem("loginUser");
    }
  }, [session.loginUser]);

  // cart가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(session.cart));
  }, [session.cart]);

  const login = useCallback(
    (id: number, name: string) => {
      dispatch({ type: "login", payload: { id, name } });
    },
    [session]
  );

  const logout = useCallback(() => {
    dispatch({ type: "logout" });
  }, [session]);

  const addCartItem = useCallback(
    (name: string, price: number) => {
      const newItem: CartItem = {
        id: session.cart.length + 1,
        name,
        price,
      };
      dispatch({ type: "addCartItem", payload: newItem });
    },
    [session.cart]
  );

  const removeCartItem = useCallback(
    (itemId: number) => {
      dispatch({ type: "removeCartItem", payload: itemId });
    },
    [session]
  );

  const updateCartItem = useCallback(
    (updatedItem: CartItem) => {
      dispatch({ type: "updateCartItem", payload: updatedItem });
    },
    [session]
  );

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        addCartItem,
        removeCartItem,
        updateCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
