import { createContext, useContext } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { MyContext } from "../../ContextProvider";
const PostsContext = createContext();

function PostFeed() {
  
  const { postsWithContacts, setPostsWithContacts, fetchCommentsWithContacts } = useContext(MyContext);

  const handlePostSubmit = async (newPost) => {
    try {
      const response = await fetch(
        "https://boolean-uk-api-server.fly.dev/sebgro98/post",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) throw new Error("Error saving post to API");

      const savedPost = await response.json();

      setPostsWithContacts((prevPosts) => [...prevPosts, savedPost]);
    } catch (error) {
      console.error("Error submitting new post:", error);
    }
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "";
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <PostsContext.Provider
      value={{ postsWithContacts, handlePostSubmit, getInitials, fetchCommentsWithContacts }}
    >
      <PostForm />
      <PostList />
    </PostsContext.Provider>
  );
}

export { PostFeed, PostsContext };
