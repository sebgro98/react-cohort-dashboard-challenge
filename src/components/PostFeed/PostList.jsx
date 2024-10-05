import {Post} from "./Post";
import { useContext } from "react";
import { PostsContext } from "./PostFeed";
function PostList() {
  const { postsWithContacts } = useContext(PostsContext);

  return (
    <ul>
      {postsWithContacts
        .slice()
        .reverse()
        .map((post, index) => (
          <Post key={index} post={post} />
        ))}
    </ul>
  );
}

export default PostList;
