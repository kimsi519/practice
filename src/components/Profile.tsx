// src/components/Profile.tsx
import React from "react";
import { useSession } from "../context/SessionContext";

const Profile: React.FC = () => {
  const { session, logout } = useSession();
  const { loginUser } = session;

  return (
    <div className="profile-container">
      <h1>Hello, {loginUser?.name}!</h1>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
