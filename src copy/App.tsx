// src/App.tsx
import React from "react";
import My from "./components/My";
import { SessionProvider } from "./context/SessionContext";
import "./App.css"; // 스타일을 임포트합니다.

function App() {
  return (
    <SessionProvider>
      <div className="app-container">
        <My />
      </div>
    </SessionProvider>
  );
}

export default App;
