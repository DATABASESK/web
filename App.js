import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivationScreen from "./components/ActivationScreen";
import MovieGrid from "./components/MovieGrid";
import MoviePlayer from "./components/MoviePlayer";
import Netflix from "./components/Netflix";
import axios from "axios";

function App() {
  const [isActivated, setIsActivated] = useState(false);
  const [validKeys, setValidKeys] = useState([]);

  useEffect(() => {
    // Fetch valid activation keys
    axios
      .get("https://final-rj4x.onrender.com/activationKeys")
      .then((response) => setValidKeys(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      {isActivated ? (
        <Routes>
          <Route path="/" element={<MovieGrid apiUrl="https://final-rj4x.onrender.com/tamil" />} />
          <Route path="/kids" element={<MovieGrid apiUrl="https://final-rj4x.onrender.com/PRIVATE" />} />
          <Route path="/hollywood" element={<MovieGrid apiUrl="https://final-rj4x.onrender.com/Hollywood" />} />
          <Route path="/series" element={<Netflix />} />
          <Route path="/player" element={<MoviePlayer />} />
        </Routes>
      ) : (
        <ActivationScreen onActivate={() => setIsActivated(true)} validKeys={validKeys} />
      )}
    </Router>
  );
}

export default App;
