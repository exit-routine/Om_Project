import React from "react";
import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <div>
      <div style={{marginLeft:"30px"}}><Navbar/></div>
      
      <h1>Oops..Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      
    </div>
  );
}

export default NotFound;
