import { createContext, useEffect, useState, useCallback } from 'react';

// Create context
export const MyContext = createContext();

function PostContextProvider({ children }) {
  const [postsWithContacts, setPostsWithContacts] = useState([]);
  const [commentsWithContacts, setCommentsWithContacts] = useState([]);
  const [contactWithId, setContactWithId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPostsWithContacts = async () => {
    try {
      const postResponse = await fetch(
        "https://boolean-uk-api-server.fly.dev/sebgro98/post"
      );
      const posts = await postResponse.json();

      const contactPromises = posts.map(async (post) => {
        const contactResponse = await fetch(
          `https://boolean-uk-api-server.fly.dev/sebgro98/contact/${post.contactId}`
        );
        const contact = await contactResponse.json();
        return { ...post, contact };
      });

      const postsWithContacts = await Promise.all(contactPromises);
      setPostsWithContacts(postsWithContacts);
    } catch (error) {
      console.error("Error fetching posts or contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactById = useCallback(async (id) => {
    try {
      const response = await fetch(`https://boolean-uk-api-server.fly.dev/sebgro98/contact/${id}`);
      const data = await response.json();
      setContactWithId(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  }, []);
  const fetchCommentsWithContacts = async (postId) => {
    try {
      const commentResponse = await fetch(`https://boolean-uk-api-server.fly.dev/sebgro98/post/${postId}/comment`);
      const comments = await commentResponse.json();

      const contactPromises = comments.map(async (comment) => {
        const contactResponse = await fetch(`https://boolean-uk-api-server.fly.dev/sebgro98/contact/${comment.contactId}`);
        const contact = await contactResponse.json();
        return { ...comment, contact };
      });

      const commentsWithContacts = await Promise.all(contactPromises);
      setCommentsWithContacts(commentsWithContacts);
    } catch (error) {
      console.error('Error fetching comments or contacts:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPostsWithContacts();
  }, []);

  return (
    <MyContext.Provider value={{ postsWithContacts, commentsWithContacts, fetchCommentsWithContacts,
     setPostsWithContacts, contactWithId, fetchContactById, setContactWithId }}>
        {children}
    </MyContext.Provider>
  );
}

export default PostContextProvider;
