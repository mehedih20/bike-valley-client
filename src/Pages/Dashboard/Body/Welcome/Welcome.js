import React from "react";
import useAuth from "../../../../Hooks/useAuth";

const Welcome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-center common-title py-5 text-secondary">
        Welcome <span className="text-primary">{user.displayName}</span> !
      </h1>
    </div>
  );
};

export default Welcome;
