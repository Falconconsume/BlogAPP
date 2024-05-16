import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Logout = () => {
  const { setCurrentUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  setCurrentUser(null);
  navigate("/login");

  return <></>;
};

export default Logout;
