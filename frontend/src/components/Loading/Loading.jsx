import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="auth-page">
      <div className="loading-container">
        <img
          src="/valorant.png"
          alt="Loading"
          className="loading-image"
        />
      </div>
    </div>
  );
};

export default Loading;
