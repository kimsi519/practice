import { useState, useRef } from "react";
import My from "./components/My";
import { SessionProvider } from "./context/SessionContext";
import "./App.css";

// User, CartItem, Session 타입 정의

function App() {
  return (
    <SessionProvider>
      <My></My>
    </SessionProvider>
  );
}

export default App;
