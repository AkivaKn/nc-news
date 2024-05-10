import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Article from "./components/Article";
import NotFound from "./components/NotFound";
import { UserProvider } from "./contexts/User";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ThemeContext } from "./contexts/Theme";
import { useContext, useEffect, useState } from "react";
import PostArticle from "./components/PostArticle";
import { getTopics } from "./api";

function App() {
  const { theme } = useContext(ThemeContext);
  const [topicsList, setTopicsList] = useState([]);


  useEffect(() => {
    getTopics().then(({data:{topics}}) => {
      setTopicsList(topics)
    })
},[])



  return (
      <UserProvider>
        <div id="app" className={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<Home topicsList={topicsList}/>} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-article" element={<PostArticle topicsList={topicsList} />}/>
          </Routes>
        </div>
      </UserProvider>
  );
}

export default App;
