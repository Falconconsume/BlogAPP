import { IPostItem } from "../types/posts.ts";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor.tsx";
import { REACT_ASSETS_URI } from "../../constants/constants.ts";

const PostItem = (props: IPostItem) => {
  const {
    postID,
    category,
    title,
    description,
    thumbnail,
    authorID,
    createdAt,
  } = props;
  const shortDescription =
    description.length > 145
      ? description.substring(0, 150) + "..."
      : description;
  const postTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={`${REACT_ASSETS_URI}/uploads/${thumbnail}`} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
        <div className="post_footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link to={`posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
