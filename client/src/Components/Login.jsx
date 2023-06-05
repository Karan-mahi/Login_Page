import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    const data = await res.json();

    if (res.status === 200) {
      alert(data.message);
      navigate("/profile");
    } else alert(data.message);
  };

  return (
    <section className=" text-center text-lg-start mx-5">
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="Trendy Pants and Shoes"
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>
          <div className="col-lg-8">
            <div className="card-body py-5 px-md-5">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example1"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                  />
                  <label className="form-label" for="form2Example1">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example2"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                  />
                  <label className="form-label" for="form2Example2">
                    Password
                  </label>
                </div>

                <div className="row mb-4">
                  <div className="col d-flex justify-content-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form2Example31"
                        checked
                      />
                      <label className="form-check-label" for="form2Example31">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                  </div>

                  <div className="col">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block mb-4"
                  onClick={login}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
