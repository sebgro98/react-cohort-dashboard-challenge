import {Post} from "./Post";
import { useContext } from "react";
import { PostsContext } from "./PostFeed";
function PostList() {
  const { postsWithContacts, getInitials } = useContext(PostsContext);
  console.log(postsWithContacts);

  return (
    <ul>
      {postsWithContacts
        .slice()
        .reverse()
        .map((post, index) => (
          <Post key={index} post={post} getInitials={getInitials} />
        ))}
    </ul>
  );
}

export default PostList;
