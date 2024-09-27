// src/components/Profile.tsx
import React from "react";
import { useSession } from "../context/SessionContext";

const Profile: React.FC = () => {
  const { session, logout } = useSession();
  const { loginUser } = session;

  return (
    <div className="profile-container">
      <h1>Hello, {loginUser?.name}!</h1>
      <p className="age">({loginUser?.id}세)</p>
      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
