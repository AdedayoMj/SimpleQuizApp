import React from "react";
import { NavLink } from "react-router-dom";

import "../../Navbar/navbar.css";
import "../SignedOutLinks/signOut.css";

const SignedInLinks = ({ SignOut, user }) => {
  return (
    <ul className="right">
      <li>
        <NavLink className="style_btn" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="style_btn" to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink className="style_btn" to="#" onClick={() => SignOut()}>
          Logout
        </NavLink>
      </li>
      <li>
        <span className="btn btn-floating initBtn">
          {user.name.charAt(0)}
          {user.name.charAt(1)}
        </span>
      </li>
    </ul>
  );
};

export default SignedInLinks;
