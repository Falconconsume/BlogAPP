import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// @ts-ignore
import { UserContext } from "../context/userContext.tsx";
import { REACT_BASE_URI } from "../../constants/constants.ts";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // @ts-ignore
  const { setCurrentUser } = useContext(UserContext);
  const changeInputHandler = (e: any) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${REACT_BASE_URI}/users/login`,
        userData
      );
      const loginUser = await response.data;
      setCurrentUser(loginUser);
      if (!loginUser) {
        setError("Couldn`t login this user");
      }
      navigate("/");
    } catch (err: any | Object) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form register_form" onSubmit={loginUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>
        <small>
          Don't have an account <Link to="/register">Sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
