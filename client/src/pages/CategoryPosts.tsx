import PostItem from "../components/PostItem.tsx";
import { useState, useEffect } from "react";
import { REACT_BASE_URI } from "../../constants/constants.ts";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${REACT_BASE_URI}/posts/categories/${category}`
        );
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [category]);

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

export default CategoryPosts;
