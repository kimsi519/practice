// src/reducer/sessionReducer.ts
import { Session, CartItem } from "../types";

export const initialSession: Session = {
  loginUser: null,
  cart: [],
};

type Action =
  | { type: "login"; payload: { id: number; name: string } }
  | { type: "logout" }
  | { type: "addCartItem"; payload: CartItem }
  | { type: "removeCartItem"; payload: number };

export const sessionReducer = (state: Session, action: Action): Session => {
  switch (action.type) {
    case "login":
      return { ...state, loginUser: action.payload };
    case "logout":
      return { ...state, loginUser: null };
    case "addCartItem":
      return { ...state, cart: [...state.cart, action.payload] };
    case "removeCartItem":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
