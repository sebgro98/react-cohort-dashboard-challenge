import { Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { PostFeed } from "./components/PostFeed/PostFeed";
import PostDetails from "./components/PostFeed/PostDetails";
import Header from "./components/Header/Header";
import LeftMenu from "./components/Header/LeftMenu";
import PostContextProvider from './ContextProvider';
import ProfilePage from "./components/Header/ProfilePage";
import "./App.css";

const ContactContext = createContext();

function App() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          "https://boolean-uk-api-server.fly.dev/sebgro98/contact/1"
        );
        const contactData = await response.json();
        setContact(contactData);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, []);

  if(contact)

  return (
    <PostContextProvider>
    <ContactContext.Provider value={{ contact }}>
      <div className="app">
        <header>
          <Header />
        </header>
        <div className="main-container">
          <nav className="left-menu">
            <LeftMenu />
          </nav>
          <div className="main-content">
            <Routes>
              <Route path="/profile/:contactId" element={<ProfilePage />} />
              <Route path="/" element={<PostFeed />} />
              <Route path="/post/:postId" element={<PostDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </ContactContext.Provider>
    </PostContextProvider>
  );
}

export { App, ContactContext };
