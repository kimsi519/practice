// src/components/Login.tsx
import React, { useState, memo } from "react";
// import { useSession } from "../context/SessionContext";
interface LoginProps {
  login: (id: number, name: string) => void;
  inputClassName?: string;
}

const Login: React.FC<LoginProps> = memo(({ login, inputClassName }) => {
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
        <div className="input-group">
          <div className="input-row">
            <label htmlFor="id" className="login-label">
              Login ID(숫자):
            </label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              className="login-input"
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-row">
            <label htmlFor="name" className="login-label">
              Login Name:
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
});

export default Login;
