import React from "react";
import { useState } from "react";
import StaffLoginForm from "../forms/staff/StaffLoginForm";
import StaffSignupForm from "../forms/staff/StaffSignupForm";

const StaffAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      {isLogin ? (
        <StaffLoginForm onFormSwitch={toggleMode} />
      ) : (
        <StaffSignupForm onFormSwitch={toggleMode} />
      )}
    </div>
  );
};

export default StaffAuth;
