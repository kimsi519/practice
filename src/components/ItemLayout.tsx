// src/ItemLayout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ItemLayout: React.FC = () => {
  return (
    <div>
      <h2>ITEMS</h2>
      <nav>
        <Link to="/items/1">Item1</Link>
        <Link to="/items/2">Item2</Link>
      </nav>
      {/* 하위 Route의 컴포넌트가 여기 렌더링됨 */}
      <Outlet />
    </div>
  );
};

export default ItemLayout;
