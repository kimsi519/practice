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
import ItemLayout from "./components/ItemLayout";

function App() {
  return (
    <SessionProvider>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/my" element={<My />} />
          {/* ItemLayout이 아이템 목록과 선택된 아이템 상세 정보를 처리 */}
          <Route path="/items" element={<ItemLayout />}>
            {/* <Route index element={<Items />} /> */}
            {/* 상세 페이지 경로 설정 */}
            <Route path=":id" element={<Item />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </SessionProvider>
  );
}

export default App;
