import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { REACT_BASE_URI } from "../../constants/constants";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e: any) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${REACT_BASE_URI}/users/register`,
        userData
      );
      console.log(response);
      const newUser = await response.data;
      if (!newUser) {
        setError("Couldn't register user. Please try again");
      }
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register_form" onSubmit={registerUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
        <small>
          Already have an account? <Link to="/login">Sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
