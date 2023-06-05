import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      setUserData(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  });

  return (
    <>
      <h1 className="head">User Data</h1>
      <div className="center">
        <h3>Name:- {userData.name}</h3>
        <h3>Email:- {userData.email}</h3>
      </div>
    </>
  );
};

export default About;
