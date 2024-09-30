// src/components/Items.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const Items: React.FC = () => {
  const { session } = useSession();
  const { cart } = session;

  return (
    <div className="items-container">
      <h2>Items List</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {/* 개별 아이템의 id를 통해 Item.tsx로 링크 이동 */}
            <Link to={`/items/${item.id}`}>
              {item.name} - {item.price.toLocaleString()}원
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
