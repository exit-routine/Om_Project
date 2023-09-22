import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

export default function Navbar() {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: '#333',
    // color: '#fff',
    padding: "10px",
  };

  const navItemStyle = {
    padding: "10px",
  };

  return (
    <div style={navbarStyle}>
      <div>
        <div className="nav">
          <div className="nav-item" style={navItemStyle}>
            
              <Link to="/">
                <button className="home-button">Home</button>
                </Link>
                
          </div>
        </div>
      </div>
    </div>
  );
}
