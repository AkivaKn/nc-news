import { Link } from "react-router-dom";
import StyledHeader from "../styling-components/StyledHeader";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { ThemeContext } from "../contexts/Theme";

export default function Header() {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const headerTheme = theme === "light" ? "dark" : "light";

  const handleClick = () => {
    setTheme((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
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
        <Link to={"/profile"}>
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
        </Link>
      </StyledHeader>
    </header>
  );
}
