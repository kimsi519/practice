// src/styles.ts
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// 전역적으로 사용할 색상 변수를 정의
const appColor = '#FF6347'; // 예시로 사용할 색상 (토마토색)

// ul 요소의 기본 스타일 정의
export const UI = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 10px;
`;

// NavLink를 확장하여 스타일을 적용한 StyledNavLink 컴포넌트 정의
export const StyledNavLink = styled(NavLink)`
  outline: invert;
  &:link {
    color: blue;
    transition: 0.5s;
    text-decoration: none;
  }
  &:hover {
    transition: 0.5s;
    color: green;
  }
  &.active {
    color: ${appColor}; // active 클래스가 적용되었을 때의 색상
    font-weight: bold; // active 상태에서 텍스트를 굵게 표시
  }
`;
