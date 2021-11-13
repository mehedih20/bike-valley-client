import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import welcome from "../../../../img/welcome.png";

const Welcome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-center common-title pt-5 text-secondary">
        Welcome <span className="text-danger">{user.displayName}</span> !
      </h1>
      <div className="d-flex justify-content-center">
        <img className="img-fluid" src={welcome} alt="welcome" />
      </div>
    </div>
  );
};

export default Welcome;
