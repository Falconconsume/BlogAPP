import { useState, useContext, useEffect } from "react";
import { DUMMY_POSTS } from "../data.ts";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext.tsx";
import axios from "axios";
import { REACT_ASSETS_URI, REACT_BASE_URI } from "../../constants/constants.ts";
import DeletePost from "./DeletePost.tsx";

interface IPost {
  id: string;
  thumbnail: string;
  title: string;
  _id: string;
}

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const navigate = useNavigate();

  const { currentUser }: any = useContext(UserContext);
  const { id } = currentUser;
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${REACT_BASE_URI}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [id]);

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard_container">
          {posts.map((post) => {
            return (
              <article key={post.id} className="dashboard_posts">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img
                      src={`${REACT_ASSETS_URI}/uploads/${post.thumbnail}`}
                      alt=""
                    />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className={`btn sm`}>
                    View
                  </Link>
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className={`btn sm primary`}
                  >
                    Edit
                  </Link>
                  <DeletePost postId={post._id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts yet</h2>
      )}
    </section>
  );
};

export default Dashboard;
