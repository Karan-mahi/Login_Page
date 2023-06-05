import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async (e) => {
        e.preventDefault();
    const { name, email, password, confirmPassword } = user;

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });
    const data = await res.json();

    if (res.status === 201 || res.status === 403) {
      alert(data.message);
      navigate("/login");
      
    } else alert(data.message);
  };

  return (
    <section className="text-center text-lg-start my-1">
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div
              className="card cascading-right"
              style={{
                background: "hsla(0, 0, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form>
                  <div className="row">
                    <div className="col-md mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          value={user.name}
                          onChange={handleChange}
                          name="name"
                        />
                        <label className="form-label">First name</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={user.email}
                      onChange={handleChange}
                      name="email"
                    />
                    <label className="form-label">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={user.password}
                      onChange={handleChange}
                      name="password"
                    />
                    <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={user.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                    />
                    <label className="form-label">Confirm Password</label>
                  </div>

                  <button
                    className="btn btn-primary btn-block mb-4"
                    onClick={register}
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
