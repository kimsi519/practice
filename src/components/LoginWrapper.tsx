// src/components/LoginWrapper.tsx
import React, { useCallback } from "react";
import { useSession } from "../context/SessionContext";
import Login from "./Login";

// Login 컴포넌트를 wrapping하여 context의 변경에 따른 re-rendering을 방지합니다.
const LoginWrapper: React.FC = () => {
  const { login } = useSession();
  const memoizedLogin = useCallback(
    (id: number, name: string) => login(id, name),
    [login]
  );

  return <Login login={memoizedLogin} />;
};

export default LoginWrapper;
