import { Session, CartItem, User } from "../types";

type ActionType =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "addCartItem"; payload: CartItem }
  | { type: "removeCartItem"; payload: number };

export const initialSession: Session = {
  loginUser: null,
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

export const sessionReducer = (state: Session, action: ActionType): Session => {
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
        cart: state.cart.filter((item: CartItem) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
