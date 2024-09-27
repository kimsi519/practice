export interface User {
  id: number;
  name: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

export interface Session {
  loginUser: User | null;
  cart: CartItem[];
}
