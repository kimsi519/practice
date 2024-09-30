// src/components/Profile.tsx
import React from "react";
import { useSession } from "../context/SessionContext";

const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const { session, logout } = useSession();
  const { loginUser } = session;

  return (
    <div className={`profile-container ${className}`}>
      <h1>User Name: {loginUser?.name}!</h1>

      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
