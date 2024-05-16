import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { REACT_ASSETS_URI, REACT_BASE_URI } from "../../constants/constants";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

interface Author {
  avatar: string;
  name: string;
}

interface PostAuthorProps {
  createdAt: Date;
  authorID: string;
}

const PostAuthor = ({ createdAt, authorID }: PostAuthorProps) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const res = await axios.get(`${REACT_BASE_URI}/users/${authorID}`);
        setAuthor(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load author information");
      }
    };
    getAuthor();
  }, [authorID]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Link to={`/posts/users/${authorID}`} className="post_author">
      <div className="post_author-avatar">
        <img
          src={`${REACT_ASSETS_URI}/uploads/${author?.avatar}`}
          alt={author?.name || "Author Avatar"}
        />
      </div>
      <div className="post_author-info">
        <h5>By: {author?.name || "Unknown Author"}</h5>
        <small>
          <ReactTimeAgo
            date={new Date(createdAt || 1) || new Date()}
            locale="en-US"
          />{" "}
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
