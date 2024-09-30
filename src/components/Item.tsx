// src/components/Item.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const Item: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL 경로에서 id 추출
  const { session } = useSession();
  const item = session.cart.find((item) => item.id === Number(id)); // 해당 id의 아이템 찾기

  if (!item) {
    return <div>Item not found</div>; // 해당 id의 아이템이 없을 때 처리
  }

  return (
    <div className="item-details">
      <h2>Item Details</h2>
      <p>
        <strong>ID:</strong> {item.id}
      </p>
      <p>
        <strong>Name:</strong> {item.name}
      </p>
      <p>
        <strong>Price:</strong> {item.price.toLocaleString()}원
      </p>
      <Link to="/items">Back to Items</Link> {/* 뒤로가기 링크 */}
    </div>
  );
};

export default Item;
