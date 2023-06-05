import React from "react";

import { NavLink } from "react-router-dom";
const Navbar = () => {
  let url = "";
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary  navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href={url}>
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div style={{justifyContent:"right"}} className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul style={{display:"contents"}} className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to='/'>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
