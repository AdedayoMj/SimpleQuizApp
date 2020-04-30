import React from "react";
import { NavLink } from "react-router-dom";
import "../../Navbar/navbar.css";
import "./signOut.css"

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink className='style_btn' to="/signin">Login</NavLink>
      </li>
      <li>
        <NavLink className='style_btn' to="/signup">SignUp</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
