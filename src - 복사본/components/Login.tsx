// src/components/Login.tsx
import React, { useState } from "react";
import { useSession } from "../context/SessionContext";

const Login: React.FC = () => {
  const { login } = useSession();
  const [name, setName] = useState("");
  const [id, setId] = useState<number | "">("");

  const handleLogin = () => {
    if (name && id) {
      login(Number(id), name);
    } else {
      alert("ID와 이름을 입력해주세요.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign In</h2>
      <form className="login-form">
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="id" className="login-label">
              ID
            </label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="name" className="login-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          </div>
        </div>
        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
