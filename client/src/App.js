import React from "react";
import {Route, Routes } from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "bootstrap/dist/css/bootstrap.css";
const App = () => {
  return (
    <>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
    </>
  );
};

export default App;
