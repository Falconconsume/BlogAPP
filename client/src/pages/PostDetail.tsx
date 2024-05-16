import { useContext, useState, useEffect } from "react";
import PostAuthor from "../components/PostAuthor.tsx";
import { Link, useParams } from "react-router-dom";
import DeletePost from "./DeletePost.tsx";
import { UserContext } from "../context/userContext.tsx";
import axios from "axios";
import { REACT_ASSETS_URI, REACT_BASE_URI } from "../../constants/constants.ts";

interface IPost {
  config: any;
  data: IInfoPost;
}

interface IInfoPost {
  _id: string;
  category: string;
  createdAt: string;
  creator: any;
  description: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
}

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any | Object>({});
  const [error, setError] = useState(null);

  const { currentUser }: any = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response: IPost = await axios.get(
          `${REACT_BASE_URI}/posts/${id}`
        );
        console.log(response);
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  return (
    <div>
      <section className="post-detail">
        {error && <p className="error">{error}</p>}
        {post && (
          <div className="container post-detail_container">
            <div className="post-detail_header">
              <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
              {currentUser?.id == post.creator && (
                <div className="post-detail_buttons">
                  <Link
                    to={`/posts/${post?._id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <DeletePost postId={id} />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <div className="post-detail_thumbnail">
              <img
                src={`${REACT_ASSETS_URI}/uploads/${post.thumbnail}`}
                alt=""
              />
            </div>
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PostDetail;
