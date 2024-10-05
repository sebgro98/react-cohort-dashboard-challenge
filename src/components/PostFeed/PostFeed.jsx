import { createContext, useContext } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { MyContext } from "../../ApiProvider";
const PostsContext = createContext();

function PostFeed() {
  
  const { postsWithContacts, fetchCommentsWithContacts } = useContext(MyContext);

  
  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "";
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <PostsContext.Provider
      value={{ postsWithContacts, getInitials, fetchCommentsWithContacts }}
    >
      <PostForm />
      <PostList />
    </PostsContext.Provider>
  );
}

export { PostFeed, PostsContext };
