import React, { useState } from "react";

const ActivationScreen = ({ onActivate, validKeys }) => {
  const [activationKey, setActivationKey] = useState("");

  const handleActivation = () => {
    if (validKeys.includes(activationKey.toUpperCase())) {
      localStorage.setItem("isActivated", "true");
      onActivate();
    } else {
      alert("Invalid Activation Key!");
    }
  };

  return (
    <div className="activation-container">
      <h1>Enter Activation Key</h1>
      <input
        type="text"
        placeholder="Enter your activation key"
        value={activationKey}
        onChange={(e) => setActivationKey(e.target.value)}
      />
      <button onClick={handleActivation}>Activate</button>
    </div>
  );
};

export default ActivationScreen;
