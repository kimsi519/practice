// src/App.tsx
import { SessionProvider } from "./context/SessionContext";
import My from "./components/My";
import "./App.css";
import Nav from "./Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Items from "./components/Items";
import Item from "./components/Item"; // 아이템 상세 페이지 컴포넌트 임포트
import NotFound from "./NotFound";
import LoginWrapper from "./components/LoginWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <SessionProvider>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/my" element={<My />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<Item />} />{" "}
          {/* 상세 페이지 경로 설정 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </SessionProvider>
  );
}

export default App;
