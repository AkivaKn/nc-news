import { Link } from "react-router-dom";
import StyledHeader from "../styling-components/StyledHeader";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { ThemeContext } from "../contexts/Theme";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const headerTheme = theme === "light" ? "dark" : "light";
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setTheme((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  };

  const handleMenuClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowProfileMenu(false);
  };

  const handleArticleClick = () => {
    navigate("/post-article");

    setShowProfileMenu(false);
  };

  return (
    <header>
      <StyledHeader>
        <button
          className={`theme-toggle-button ${headerTheme}`}
          onClick={handleClick}
        >
          {theme === "dark" ? (
            <i className="fa-regular fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>
        <Link to={"/"}>
          <h1> NC News</h1>
        </Link>
        <div id="profile-menu">
          <button id="profile-menu-button" onClick={handleMenuClick} className={headerTheme}>
            {user && user.username ? (
              <img
                src={user.avatar_url}
                alt="user avatar"
                height={"30px"}
                width={"30px"}
                id="profile-picture"
              />
            ) : (
              <i className="fa-regular fa-user"></i>
            )}
          </button>
          {showProfileMenu ? (
            <nav id="profile-nav" className={`${headerTheme}-button`}>
              <button onClick={handleProfileClick}>Profile</button>
              <button onClick={handleArticleClick}>New Article</button>
            </nav>
          ) : null}
        </div>
      </StyledHeader>
    </header>
  );
}
