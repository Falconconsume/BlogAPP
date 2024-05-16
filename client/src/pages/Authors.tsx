import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { REACT_ASSETS_URI, REACT_BASE_URI } from "../../constants/constants";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response: any = await axios.get(`${REACT_BASE_URI}/users`);
        setAuthors(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAuthors();
  }, []);

  return (
    <div>
      <section className="authors">
        {authors.length > 0 ? (
          <div className="container authors_container">
            {authors.map(({ _id: id, avatar, name, posts }) => {
              return (
                <Link key={id} to={`/posts/users/${id}`} className="author">
                  <div className="author_avatar">
                    <img
                      src={`${REACT_ASSETS_URI}/uploads/${avatar}`}
                      alt={`Image of ${name}`}
                    />
                  </div>
                  <div className="author_info">
                    <h4>{name}</h4>
                    <p>{posts}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <h2 className="center">No users/authors found.</h2>
        )}
      </section>
    </div>
  );
};

export default Authors;
