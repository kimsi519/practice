import { useState, useRef } from "react";
import My from "./components/My";
import { SessionProvider } from "./context/SessionContext";
import { CounterProvider } from "./context/CounterContext";
import "./App.css";

// User, CartItem, Session 타입 정의

function App() {
  return (
    <SessionProvider>
      <CounterProvider>
        <My></My>
      </CounterProvider>
    </SessionProvider>
  );
}

export default App;
