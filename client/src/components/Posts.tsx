import { useEffect, useState } from "react";
import axios from "axios";

import PostItem from "./PostItem.tsx";
import Loader from "./Loader.tsx";
import { REACT_BASE_URI } from "../../constants/constants.ts";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${REACT_BASE_URI}/posts`);
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  });

  return (
    <>
      <section className="posts">
        {posts.length > 0 ? (
          <div className="container posts_container">
            {posts.map(
              (
                {
                  _id: id,
                  thumbnail,
                  category,
                  title,
                  description,
                  creator,
                  createdAt,
                },
                index
              ) => (
                <PostItem
                  key={index}
                  postID={id}
                  thumbnail={thumbnail}
                  category={category}
                  title={title}
                  description={description}
                  authorID={creator}
                  createdAt={createdAt}
                />
              )
            )}
          </div>
        ) : (
          <h2 className="center">No posts found</h2>
        )}
      </section>
    </>
  );
};
export default Posts;
