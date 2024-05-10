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
import { useContext } from "react";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
      <UserProvider>
        <div id="app" className={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles/:article_id" element={<Article />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </UserProvider>
  );
}

export default App;
