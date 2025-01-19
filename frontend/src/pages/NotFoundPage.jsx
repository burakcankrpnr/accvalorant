import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to="/" className="home-link">Go Back to Home</Link>
        <div className="not-found-animation">
          <img src="/valorant.png" alt="404 Animation" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;