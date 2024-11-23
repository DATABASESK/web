import React from "react";
import { useLocation } from "react-router-dom";

const MoviePlayer = () => {
  const location = useLocation();
  const { videoLink } = location.state || {};

  if (!videoLink) {
    return <div className="message-container">Please select a movie first.</div>;
  }

  return (
    <div className="webview-container">
      <iframe src={videoLink} title="Movie Player" allowFullScreen></iframe>
    </div>
  );
};

export default MoviePlayer;
