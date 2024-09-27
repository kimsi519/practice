// src/reducer/sessionReducer.ts
import { Session, CartItem, User } from "../types";

// 액션 타입 정의
type ActionType =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "addCartItem"; payload: CartItem }
  | { type: "removeCartItem"; payload: number };

// 초기 상태 설정
export const initialSession: Session = {
  loginUser: null,
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

// 리듀서 함수 정의
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
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
