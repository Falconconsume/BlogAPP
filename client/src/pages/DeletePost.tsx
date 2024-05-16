import { useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext.tsx";
import axios from "axios";
import { REACT_BASE_URI } from "../../constants/constants.ts";

const DeletePost = ({ postId: id }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser }: any = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async () => {
    try {
      const response = await axios.delete(`${REACT_BASE_URI}/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log("Couldn't delete post");
    }
  };

  return (
    <>
      <Link to={`/`} onClick={() => removePost()} className="btn sm danger">
        Delete
      </Link>
    </>
  );
};

export default DeletePost;
